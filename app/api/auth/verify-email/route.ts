import { NextResponse } from "next/server";
import { setSessionCookie, signSessionToken } from "../../../../lib/auth-session";
import { sanitizeRedirectTarget } from "../../../../lib/auth-redirect";
import { verifyPendingSignupEmail } from "../../../../lib/email-verification";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = String(url.searchParams.get("token") ?? "").trim();
  const nextTarget = sanitizeRedirectTarget(url.searchParams.get("next"), url.origin);
  const loginUrl = new URL("/login", url.origin);

  if (!token) {
    loginUrl.searchParams.set("error", "Missing verification token.");
    return NextResponse.redirect(loginUrl);
  }

  try {
    const pending = await verifyPendingSignupEmail(token);
    if (pending.status !== "pending") {
      loginUrl.searchParams.set("verified", "1");
      return NextResponse.redirect(loginUrl);
    }

    const sessionToken = signSessionToken({
      session_type: "pending",
      pending_signup_id: pending.id,
      email: pending.email
    });

    const redirectUrl = new URL(nextTarget, url.origin);
    const response = NextResponse.redirect(redirectUrl);
    setSessionCookie(response, sessionToken);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to verify email.";
    loginUrl.searchParams.set("error", message);
    return NextResponse.redirect(loginUrl);
  }
}
