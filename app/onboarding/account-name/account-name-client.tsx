"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

function getSafeNext(): string {
  if (typeof window === "undefined") {
    return "/";
  }
  const rawNext = new URLSearchParams(window.location.search).get("next");
  if (!rawNext) {
    return "/";
  }

  if (rawNext.startsWith("/")) {
    return rawNext;
  }

  try {
    const parsed = new URL(rawNext);
    const allowList = new Set<string>([
      window.location.origin,
      process.env.NEXT_PUBLIC_APP_URL ?? "",
      ...(process.env.NEXT_PUBLIC_ALLOWED_REDIRECT_ORIGINS ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    ]);
    if (allowList.has(parsed.origin)) {
      return parsed.toString();
    }
  } catch {
    return "/";
  }
  return "/";
}

export default function AccountNameOnboardingPage() {
  const router = useRouter();
  const [accountName, setAccountName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const nextTarget = useMemo(() => getSafeNext(), []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountName })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error ?? "Unable to save account name.");
      }

      router.push(nextTarget);
      router.refresh();
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Unable to save account name.";
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.2),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.18),transparent_40%),linear-gradient(180deg,#020617_0%,#0b1120_45%,#111827_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative mx-auto flex min-h-screen max-w-md items-center px-6">
        <form
          onSubmit={onSubmit}
          className="w-full rounded-3xl border border-white/15 bg-slate-900/60 p-8 shadow-[0_20px_80px_rgba(2,6,23,0.6)] backdrop-blur-md"
        >
          <div className="mb-2 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">One Last Step</p>
              <h1 className="mt-2 text-3xl font-bold">Set Account Name</h1>
            </div>
            <Link
              href="/"
              className="mt-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/85 transition hover:border-teal/40 hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>
          </div>
          <p className="mt-2 text-sm text-slate-300">
            Choose an account name. You can change it later in settings.
          </p>

          <label className="mt-6 block text-left text-sm font-medium text-slate-200">Account name</label>
          <input
            type="text"
            required
            minLength={2}
            maxLength={80}
            value={accountName}
            onChange={(event) => setAccountName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-teal/50"
          />

          {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-xl bg-teal px-5 py-3 text-sm font-bold text-ink transition hover:opacity-90 disabled:opacity-60"
          >
            {isLoading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
