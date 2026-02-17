import { NextResponse } from "next/server";
import { getSessionFromCookie, verifySessionToken } from "../../../../lib/auth-session";
import { createServerSupabase } from "../../../../lib/supabase-admin";

export const runtime = "nodejs";

type ProfilePayload = {
  accountName?: string;
};

function extractBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization") ?? "";
  const [scheme, value] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !value?.trim()) {
    return null;
  }
  return value.trim();
}

function getSessionFromRequest(request: Request) {
  const bearer = extractBearerToken(request);
  if (bearer) {
    return verifySessionToken(bearer);
  }
  return getSessionFromCookie();
}

function sanitizeAccountName(value: unknown): string {
  const accountName = String(value ?? "").trim();
  if (accountName.length < 2) {
    throw new Error("Account name must be at least 2 characters.");
  }
  if (accountName.length > 80) {
    throw new Error("Account name must be at most 80 characters.");
  }
  return accountName;
}

export async function GET(request: Request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = createServerSupabase();
  if (session.session_type === "app") {
    const result = await supabase
      .from("clients")
      .select("name")
      .eq("id", session.client_id)
      .maybeSingle();

    if (result.error) {
      return NextResponse.json({ error: "Failed to load account profile." }, { status: 500 });
    }

    return NextResponse.json({
      session_type: "app",
      account_name: result.data?.name ?? null
    });
  }

  const result = await supabase
    .from("pending_signups")
    .select("company_name")
    .eq("id", session.pending_signup_id)
    .maybeSingle();

  if (result.error) {
    return NextResponse.json({ error: "Failed to load account profile." }, { status: 500 });
  }

  return NextResponse.json({
    session_type: "pending",
    account_name: result.data?.company_name ?? null
  });
}

export async function PATCH(request: Request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as ProfilePayload;
    const accountName = sanitizeAccountName(body.accountName);
    const supabase = createServerSupabase();

    if (session.session_type === "app") {
      const result = await supabase
        .from("clients")
        .update({ name: accountName, updated_at: new Date().toISOString() })
        .eq("id", session.client_id)
        .select("name")
        .maybeSingle();

      if (result.error) {
        throw new Error(`Failed to update account name: ${result.error.message}`);
      }

      return NextResponse.json({ ok: true, account_name: result.data?.name ?? accountName });
    }

    const result = await supabase
      .from("pending_signups")
      .update({ company_name: accountName, updated_at: new Date().toISOString() })
      .eq("id", session.pending_signup_id)
      .select("company_name")
      .maybeSingle();

    if (result.error) {
      throw new Error(`Failed to update account name: ${result.error.message}`);
    }

    return NextResponse.json({ ok: true, account_name: result.data?.company_name ?? accountName });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update account profile.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
