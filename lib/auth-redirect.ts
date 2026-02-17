function getAllowedOrigins(requestOrigin?: string): Set<string> {
  const origins = new Set<string>();

  if (requestOrigin) {
    origins.add(requestOrigin);
  }

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "").trim();
  if (appUrl) {
    try {
      origins.add(new URL(appUrl).origin);
    } catch {
      // Ignore invalid URL config.
    }
  }

  const websiteUrl = (process.env.WEBSITE_URL ?? "").trim();
  if (websiteUrl) {
    try {
      origins.add(new URL(websiteUrl).origin);
    } catch {
      // Ignore invalid URL config.
    }
  }

  const extraOrigins = (process.env.NEXT_PUBLIC_ALLOWED_REDIRECT_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  for (const origin of extraOrigins) {
    try {
      origins.add(new URL(origin).origin);
    } catch {
      // Ignore invalid URL config.
    }
  }

  return origins;
}

export function sanitizeRedirectTarget(next: string | null | undefined, requestOrigin?: string): string {
  const candidate = String(next ?? "").trim();
  if (!candidate) {
    return "/";
  }

  if (candidate.startsWith("/")) {
    return candidate;
  }

  try {
    const parsed = new URL(candidate);
    const allowedOrigins = getAllowedOrigins(requestOrigin);
    if (allowedOrigins.has(parsed.origin)) {
      return parsed.toString();
    }
  } catch {
    return "/";
  }

  return "/";
}
