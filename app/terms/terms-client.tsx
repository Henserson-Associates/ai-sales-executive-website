"use client";

import { motion } from "framer-motion";
import SiteHeader from "../components/site-header";

const motionProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 }
};

export default function TermsPage() {
  const showIntegrations = process.env.NEXT_PUBLIC_SHOW_INTEGRATIONS === "true";

  return (
    <div className="min-h-screen page-shell">
      <div className="relative z-10">
        <div className="pointer-events-none absolute -top-40 right-12 h-72 w-72 rounded-full bg-electric/15 blur-[140px]" />
        <div className="pointer-events-none absolute top-28 -left-24 h-72 w-72 rounded-full bg-teal/20 blur-[140px]" />

        <SiteHeader anchorPrefix="/" loginNext="/terms" showIntegrations={showIntegrations} />

        <main className="mx-auto max-w-6xl px-6 py-24">
          <motion.section {...motionProps} className="grid gap-12 lg:grid-cols-[1fr_0.35fr]">
            <article className="max-w-3xl space-y-10 text-white/70">
              <header className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Terms of Service
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-white">
                  Terms for Using LeadNexa
                </h1>
                <p className="text-base">
                  These terms govern your use of LeadNexa and the AI-powered outbound services we
                  provide. By using the platform, you agree to these terms.
                </p>
              </header>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Use of service</h2>
                <p>
                  You agree to use the service in compliance with applicable laws and third-party
                  platform policies (including email and LinkedIn rules). You are responsible for
                  the content you provide and the campaigns launched through your account.
                </p>
              </section>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Subscription and billing</h2>
                <p>
                  AI sales agent plans are billed in advance on a monthly basis unless otherwise
                  agreed. Fees are non-refundable except where required by law. You can cancel at
                  any time to stop future billing.
                </p>
              </section>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Data and security</h2>
                <p>
                  You retain ownership of your data. We process data to deliver the service and
                  secure it using industry-standard practices. See our Privacy Policy for details on
                  how we handle campaign and account data.
                </p>
              </section>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Limitation of liability</h2>
                <p>
                  LeadNexa is provided on an &quot;as is&quot; basis. To the maximum extent permitted
                  by law, we are not liable for indirect, incidental, or consequential damages
                  arising from your use of the service.
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
                  <a className="text-teal hover:text-teal/80" href="mailto:info@leadnexa.ai">
                    info@leadnexa.ai
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
