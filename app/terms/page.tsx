"use client";

import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";

const motionProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 }
};

export default function TermsPage() {
  return (
    <div className="min-h-screen page-shell">
      <div className="relative z-10">
        <div className="pointer-events-none absolute -top-40 right-12 h-72 w-72 rounded-full bg-electric/15 blur-[140px]" />
        <div className="pointer-events-none absolute top-28 -left-24 h-72 w-72 rounded-full bg-teal/20 blur-[140px]" />

        <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3 text-lg font-semibold tracking-tight">
              <ScrollText className="h-5 w-5 text-teal" />
              AI Sales Executive
            </div>
            <a
              href="/"
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Back to Home
            </a>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-24">
          <motion.section {...motionProps} className="grid gap-12 lg:grid-cols-[1fr_0.35fr]">
            <article className="max-w-3xl space-y-10 text-white/70">
              <header className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Terms of Service
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-white">
                  Terms for Using AI Sales Executive
                </h1>
                <p className="text-base">
                  These terms govern your use of AI Sales Executive and the services we provide.
                  By using the platform, you agree to these terms.
                </p>
              </header>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Use of service</h2>
                <p>
                  You agree to use the service in compliance with applicable laws and platform
                  policies. You are responsible for the content you provide and the campaigns you
                  launch through the platform.
                </p>
              </section>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Subscription and billing</h2>
                <p>
                  Plans are billed in advance on a monthly basis unless otherwise agreed. Fees are
                  non-refundable except where required by law. You can cancel at any time to stop
                  future billing.
                </p>
              </section>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Data and security</h2>
                <p>
                  You retain ownership of your data. We process data to deliver the service and keep
                  it secure using industry-standard practices. See our Privacy Policy for details.
                </p>
              </section>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Limitation of liability</h2>
                <p>
                  AI Sales Executive is provided on an &quot;as is&quot; basis. To the maximum extent
                  permitted by law, we are not liable for indirect, incidental, or consequential
                  damages arising from your use of the service.
                </p>
              </section>
            </article>

            <aside className="space-y-6 text-sm text-white/70 lg:pt-16">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Summary</p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
                    Use the service responsibly and legally.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
                    Billing is monthly unless otherwise agreed.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
                    Liability is limited to the extent allowed by law.
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Contact</p>
                <p className="mt-4">
                  Questions about these terms? Email{" "}
                  <a className="text-teal hover:text-teal/80" href="mailto:legal@aisalesexec.com">
                    legal@aisalesexec.com
                  </a>
                  .
                </p>
              </div>
            </aside>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
