"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

const valueProps = [
  {
    title: "No hiring",
    description: "Replace SDR teams without payroll or turnover.",
    icon: Users
  },
  {
    title: "Predictable capacity",
    description: "Outbound runs every day, consistently.",
    icon: TrendingUp
  },
  {
    title: "Scales cleanly",
    description: "Add 5, 10, or 100 AI Sales Executives as needed.",
    icon: Zap
  },
  {
    title: "B2B-native",
    description: "Built specifically for LinkedIn decision-makers.",
    icon: ShieldCheck
  }
];

const steps = [
  {
    title: "Define Your ICP & Offer",
    description: "We align on targeting."
  },
  {
    title: "Deploy AI Sales Executives",
    description: "Human-like behavior, daily outreach."
  },
  {
    title: "Book Meetings",
    description: "Qualified prospects booked into your calendar."
  },
  {
    title: "Scale on Demand",
    description: "Add more executives, no ramp-up."
  }
];

const audiences = [
  "B2B SaaS",
  "SaaS Resellers",
  "Recruiting / Staffing",
  "Agencies",
  "Professional Services"
];

const motionProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 }
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export default function HomePage() {
  const [quantity, setQuantity] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const pricePerSeat = 750;

  const total = useMemo(() => quantity * pricePerSeat, [quantity]);

  const clampQuantity = (value: number) => {
    if (!Number.isFinite(value)) return 5;
    return Math.max(5, Math.min(200, Math.round(value)));
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(clampQuantity(value));
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "Checkout failed.");
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-electric/20 blur-[140px]" />
        <div className="pointer-events-none absolute top-40 -left-32 h-72 w-72 rounded-full bg-teal/20 blur-[120px]" />

        <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="h-5 w-5 text-teal" />
              AI Sales Executive
            </div>
            <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
              <a href="#how" className="hover:text-white">
                How it Works
              </a>
              <a href="#pricing" className="hover:text-white">
                Pricing
              </a>
              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
            </nav>
            <a
              href="#pricing"
              className="rounded-full bg-teal px-5 py-2 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5"
            >
              Start Scaling
            </a>
          </div>
        </header>

        <main>
          <motion.section
            {...motionProps}
            className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
                B2B Outreach Infrastructure
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                Scalable LinkedIn Outreach That Books B2B Meetings
              </h1>
              <p className="mt-5 text-lg text-white/70">
                We provide AI Sales Executives--dedicated outbound operators that run LinkedIn outreach
                at scale and book qualified B2B meetings directly into your calendar.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5"
                >
                  View Pricing
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
                >
                  How It Works
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-soft">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                <span>Pipeline Overview</span>
                <span className="rounded-full bg-teal/20 px-3 py-1 text-teal">Live</span>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-ink/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/70">Prospects Contacted</p>
                    <span className="text-xl font-semibold text-white">2,438</span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-teal" />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-ink/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/70">Meetings Booked</p>
                    <span className="text-xl font-semibold text-white">86</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                    <CalendarCheck className="h-4 w-4 text-electric" />
                    Calendar filling daily
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-ink/60 p-4">
                  <p className="text-sm text-white/70">Today</p>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className={`h-10 rounded-lg border border-white/10 ${
                          index % 3 === 0
                            ? "bg-electric/40"
                            : index % 2 === 0
                            ? "bg-teal/30"
                            : "bg-white/5"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            {...motionProps}
            className="mx-auto max-w-6xl px-6 pb-16"
            id="why"
          >
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-3xl font-semibold">Why Companies Use Us</h2>
              <span className="hidden text-sm uppercase tracking-[0.3em] text-white/40 md:block">
                Value Proposition
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {valueProps.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20"
                  >
                    <Icon className="h-6 w-6 text-teal" />
                    <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            {...motionProps}
            className="mx-auto max-w-6xl px-6 pb-16"
            id="how"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-semibold">How It Works</h2>
              <p className="mt-3 text-white/70">
                A clear, repeatable process that turns LinkedIn into a dependable meeting engine.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Step {index + 1}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            {...motionProps}
            className="mx-auto max-w-6xl px-6 pb-16"
            id="audience"
          >
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-3xl font-semibold">Who This Is For</h2>
                <p className="mt-3 text-white/70">
                  Revenue teams that already know their ICP and want consistent outbound volume.
                </p>
                <p className="mt-6 text-sm text-white/50">
                  Not for early-stage startups, solopreneurs, or low-ticket offers.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {audiences.map((audience) => (
                  <div
                    key={audience}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <Check className="h-5 w-5 text-teal" />
                    <span className="text-sm font-medium">{audience}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            {...motionProps}
            className="mx-auto max-w-6xl px-6 pb-16"
            id="pricing"
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="text-3xl font-semibold">Pricing</h2>
                <p className="mt-3 text-white/70">
                  Start with a minimum of 5 AI Sales Executives. Scale up any time.
                </p>
                <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">Base price</p>
                      <p className="text-2xl font-semibold">$750 / month</p>
                    </div>
                    <div className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
                      Per Executive
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                        AI Executives
                      </label>
                      <input
                        type="range"
                        min={5}
                        max={200}
                        value={quantity}
                        onChange={(event) =>
                          handleQuantityChange(Number(event.target.value))
                        }
                        className="mt-3 w-full accent-teal"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={5}
                        max={200}
                        value={quantity}
                        onChange={(event) =>
                          handleQuantityChange(Number(event.target.value))
                        }
                        className="w-24 rounded-xl border border-white/15 bg-ink/60 px-3 py-2 text-center text-lg font-semibold"
                      />
                      <span className="text-sm text-white/50">min 5</span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">Total Monthly Investment</p>
                      <p className="text-3xl font-semibold text-teal">
                        {currency.format(total)}
                      </p>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading ? "Redirecting..." : "Purchase Plan"}
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-white/50">
                    Volume pricing available for larger teams.
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-electric" />
                  <h3 className="text-xl font-semibold">What you get</h3>
                </div>
                <ul className="mt-6 space-y-4 text-sm text-white/70">
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-teal" />
                    Dedicated AI Executive per account with daily outreach.
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-teal" />
                    Message sequencing tuned to your ICP and offer.
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-teal" />
                    Qualified meetings delivered directly to your calendar.
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-teal" />
                    Weekly performance insights and optimization.
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            {...motionProps}
            className="mx-auto max-w-6xl px-6 pb-16"
            id="faq"
          >
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8">
              <h2 className="text-3xl font-semibold">Philosophy</h2>
              <p className="mt-4 text-lg text-white/70">
                We do not promise \"viral results\" or shortcuts. We build reliable outbound
                infrastructure that compounds over time.
              </p>
            </div>
          </motion.section>
        </main>

        <footer className="border-t border-white/10 bg-ink/80">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <p>(c) 2026 AI Sales Executive. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

