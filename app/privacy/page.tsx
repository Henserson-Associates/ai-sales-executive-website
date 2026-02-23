"use client";

import { motion } from "framer-motion";
import SiteHeader from "../components/site-header";

const motionProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 }
};

export default function PrivacyPage() {
  const showIntegrations = process.env.NEXT_PUBLIC_SHOW_INTEGRATIONS === "true";

  return (
    <div className="min-h-screen page-shell">
      <div className="relative z-10">
        <div className="pointer-events-none absolute -top-40 right-12 h-72 w-72 rounded-full bg-electric/15 blur-[140px]" />
        <div className="pointer-events-none absolute top-28 -left-24 h-72 w-72 rounded-full bg-teal/20 blur-[140px]" />

        <SiteHeader anchorPrefix="/" loginNext="/privacy" showIntegrations={showIntegrations} />

        <main className="mx-auto max-w-6xl px-6 py-24">
          <motion.section {...motionProps} className="grid gap-12 lg:grid-cols-[1fr_0.35fr]">
            <article className="max-w-3xl space-y-10 text-white/70">
              <header className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Privacy Policy
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-white">
                  How We Handle Your Data
                </h1>
                <p className="text-base">
                  LeadNexa powers AI sales agents for Email and LinkedIn outbound while respecting
                  your data. This policy explains what we collect, how we use it, and the choices
                  you have.
                </p>
              </header>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Information we collect</h2>
                <p>
                  We collect account details, billing information, and configuration inputs you
                  provide (such as ICP, offers, messaging guidelines, and campaign settings). We
                  also collect product usage and outreach performance data to improve reliability,
                  deliverability, and service quality.
                </p>
              </section>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">How we use data</h2>
                <p>
                  We use data to run and optimize your multi-channel outbound workflows, provide
                  support, and improve the LeadNexa platform. We do not sell your data to third
                  parties.
                </p>
              </section>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Data retention</h2>
                <p>
                  We retain data for as long as your account is active or as needed to comply with
                  legal and operational requirements. You can request deletion at any time.
                </p>
              </section>

              <section className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white">Your choices</h2>
                <p>
                  You can access, update, or delete your data by contacting us. If you have a data
                  processing request, we will respond within a reasonable timeframe.
                </p>
              </section>
            </article>

            <aside className="space-y-6 text-sm text-white/70 lg:pt-16">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Summary</p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
                    We collect the data you provide and product usage data to operate the service.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
                    We use data to run and improve Email + LinkedIn outbound workflows.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
                    You can request access, updates, or deletion.
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Contact</p>
                <p className="mt-4">
                  Email us at{" "}
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
