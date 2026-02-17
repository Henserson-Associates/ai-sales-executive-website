import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { sanitizeRedirectTarget } from "../../../../../lib/auth-redirect";

export const runtime = "nodejs";

const GOOGLE_STATE_COOKIE = "leadnexa_google_oauth_state";
const GOOGLE_NEXT_COOKIE = "leadnexa_google_oauth_next";

function getGoogleClientId(): string {
  const value = (process.env.GOOGLE_OAUTH_CLIENT_ID ?? "").trim();
  if (!value) {
    throw new Error("Missing GOOGLE_OAUTH_CLIENT_ID.");
  }
  return value;
}

function getGoogleRedirectUri(requestUrl: URL): string {
  const configured = (process.env.GOOGLE_OAUTH_REDIRECT_URI ?? "").trim();
  if (configured) {
    return configured;
  }
  return new URL("/api/auth/google/callback", requestUrl.origin).toString();
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const nextTarget = sanitizeRedirectTarget(
      requestUrl.searchParams.get("next"),
      requestUrl.origin
    );
    const state = randomBytes(24).toString("hex");

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", getGoogleClientId());
    authUrl.searchParams.set("redirect_uri", getGoogleRedirectUri(requestUrl));
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("prompt", "select_account");

    const response = NextResponse.redirect(authUrl);
    response.cookies.set({
      name: GOOGLE_STATE_COOKIE,
      value: state,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 10
    });
    response.cookies.set({
      name: GOOGLE_NEXT_COOKIE,
      value: encodeURIComponent(nextTarget),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 10
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start Google login.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
