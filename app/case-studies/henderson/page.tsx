import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

export default function HendersonCaseStudyPage() {
  return (
    <div className="min-h-screen page-shell">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-teal mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to homepage
        </Link>

        <h1 className="text-4xl font-bold tracking-tight text-white mb-3">
          Professional Services - SR&ED and Government Funding Advisory
        </h1>
        <p className="text-white/50 mb-8">
          How a specialized advisory firm helping Canadian businesses access SR&ED tax credits and other
          government funding programs uses Leadnexa AI Agents to reach more innovation-focused clients.
        </p>

        <div className="glass-panel rounded-3xl p-8 border-white/10 mb-10 grid md:grid-cols-3 gap-6 text-sm text-white/70">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-1">Firm Type</p>
            <p>SR&ED and government funding advisory</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-1">Target Market</p>
            <p>Innovation-driven Canadian businesses across tech and manufacturing</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-1">Focus</p>
            <p>High-quality consultations with financial and technical leaders</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-4">Challenges</h2>
        <ul className="space-y-3 text-sm text-white/70 mb-8">
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-teal mt-0.5" />
            <span>Complex, niche service that requires reaching CFOs, controllers and technical leaders instead of general contacts.</span>
          </li>
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-teal mt-0.5" />
            <span>Existing referrals and word-of-mouth were strong but not sufficient to support growth targets.</span>
          </li>
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-teal mt-0.5" />
            <span>Building and maintaining accurate lists of eligible, innovation-focused companies consumed valuable team time.</span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mb-4">How Leadnexa Helped</h2>
        <ul className="space-y-3 text-sm text-white/70 mb-8">
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-teal mt-0.5" />
            <span>Configured AI Agents to identify Canadian companies likely to be eligible for SR&ED and other funding programs based on industry, size and activity signals.</span>
          </li>
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-teal mt-0.5" />
            <span>Created messaging that clearly explains the value of professional SR&ED and funding support to both financial and technical stakeholders.</span>
          </li>
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-teal mt-0.5" />
            <span>AI Agents handled outbound research, outreach and follow-ups, surfacing only interested and qualified contacts for consultations.</span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mb-4">Results</h2>
        <ul className="space-y-3 text-sm text-white/70 mb-8">
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-teal mt-0.5" />
            <span>More consistent flow of consultations with innovation-driven businesses that fit the firm's ideal client profile.</span>
          </li>
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-teal mt-0.5" />
            <span>Internal team spent less time on manual prospecting and more time on advisory work and claim delivery.</span>
          </li>
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-teal mt-0.5" />
            <span>Outbound efforts aligned closely with the firm's reputation as a trusted, audit-ready government funding advisor.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
