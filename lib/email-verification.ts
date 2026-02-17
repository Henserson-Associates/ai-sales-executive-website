import { createHash, randomBytes } from "crypto";
import { sendEmail } from "./email-delivery";
import { createServerSupabase } from "./supabase-admin";

const EMAIL_VERIFICATION_TTL_HOURS = 24;

type PendingSignup = {
  id: string;
  email: string;
  status: "pending" | "activated" | "expired";
  email_verified_at: string | null;
};

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function getWebsiteBaseUrl(): string {
  const configured =
    (process.env.WEBSITE_URL ?? "").trim() || (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();

  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  return "http://localhost:3000";
}

function buildVerificationUrl(token: string, next: string | null | undefined): string {
  const url = new URL("/api/auth/verify-email", getWebsiteBaseUrl());
  url.searchParams.set("token", token);
  if (next) {
    url.searchParams.set("next", next);
  }
  return url.toString();
}

function buildVerificationEmailHtml(url: string): string {
  return [
    "<p>Thanks for registering with LeadNexa.</p>",
    "<p>Please confirm your email address to continue:</p>",
    `<p><a href="${url}">Verify Email</a></p>`,
    `<p>This link expires in ${EMAIL_VERIFICATION_TTL_HOURS} hours.</p>`
  ].join("");
}

export async function createPendingSignupVerification(input: {
  pendingSignupId: string;
  email: string;
  nextPath?: string;
}): Promise<{ verificationUrl: string }> {
  const supabase = createServerSupabase();
  const token = randomBytes(32).toString("hex");
  const tokenHash = sha256(token);
  const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_TTL_HOURS * 60 * 60 * 1000);

  await supabase
    .from("pending_signup_email_tokens")
    .delete()
    .eq("pending_signup_id", input.pendingSignupId)
    .is("used_at", null);

  const tokenInsert = await supabase.from("pending_signup_email_tokens").insert({
    pending_signup_id: input.pendingSignupId,
    token_hash: tokenHash,
    expires_at: expiresAt.toISOString()
  });

  if (tokenInsert.error) {
    throw new Error(`Failed to create email verification token: ${tokenInsert.error.message}`);
  }

  const verificationUrl = buildVerificationUrl(token, input.nextPath);
  await sendEmail({
    to: input.email,
    subject: "Verify your LeadNexa email",
    html: buildVerificationEmailHtml(verificationUrl),
    text: `Verify your email: ${verificationUrl}`
  });

  return { verificationUrl };
}

export async function verifyPendingSignupEmail(token: string): Promise<PendingSignup> {
  const supabase = createServerSupabase();
  const tokenHash = sha256(token);

  const tokenLookup = await supabase
    .from("pending_signup_email_tokens")
    .select("id, pending_signup_id, expires_at, used_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (tokenLookup.error) {
    throw new Error(`Failed to load email verification token: ${tokenLookup.error.message}`);
  }

  const tokenRow = tokenLookup.data;
  if (!tokenRow) {
    throw new Error("Invalid verification token.");
  }

  if (tokenRow.used_at) {
    throw new Error("Verification token has already been used.");
  }

  if (new Date(tokenRow.expires_at).getTime() < Date.now()) {
    throw new Error("Verification token has expired.");
  }

  const pendingLookup = await supabase
    .from("pending_signups")
    .select("id, email, status, email_verified_at")
    .eq("id", tokenRow.pending_signup_id)
    .maybeSingle();

  if (pendingLookup.error) {
    throw new Error(`Failed to load pending signup: ${pendingLookup.error.message}`);
  }

  const pending = pendingLookup.data as PendingSignup | null;
  if (!pending) {
    throw new Error("Pending signup not found.");
  }

  if (pending.status === "expired") {
    throw new Error("This signup has expired. Please register again.");
  }

  const updates: Record<string, string> = { used_at: new Date().toISOString() };
  const markTokenUsed = await supabase
    .from("pending_signup_email_tokens")
    .update(updates)
    .eq("id", tokenRow.id);

  if (markTokenUsed.error) {
    throw new Error(`Failed to mark verification token as used: ${markTokenUsed.error.message}`);
  }

  if (!pending.email_verified_at) {
    const markVerified = await supabase
      .from("pending_signups")
      .update({ email_verified_at: new Date().toISOString() })
      .eq("id", pending.id);

    if (markVerified.error) {
      throw new Error(`Failed to mark pending signup as verified: ${markVerified.error.message}`);
    }

    return { ...pending, email_verified_at: new Date().toISOString() };
  }

  return pending;
}
