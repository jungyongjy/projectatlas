import Link from "next/link";
import {
  BookOpen,
  PersonStanding,
  Footprints,
  Dumbbell,
  Apple,
  GitBranch,
  LibraryBig,
  FlaskConical,
  BookMarked,
  History,
} from "lucide-react";
import { WeeklyChecklist } from "@/components/checklist/WeeklyChecklist";

const sections = [
  {
    title: "Blueprint",
    description: "Training philosophy, long-term vision, and the principles that guide every decision.",
    href: "/blueprint",
    icon: BookOpen,
  },
  {
    title: "Running",
    description: "Zone 2, threshold, intervals, strides, long runs, and race preparation.",
    href: "/running",
    icon: Footprints,
  },
  {
    title: "Strength",
    description: "Exercise selection, weekly programming, progression model, and concurrent training strategy.",
    href: "/strength",
    icon: Dumbbell,
  },
  {
    title: "Mobility",
    description: "Thoracic spine, hips, ankles, calves, warm-up routines, and recovery mobility.",
    href: "/mobility",
    icon: PersonStanding,
  },
  {
    title: "Nutrition",
    description: "Protein, calories, hydration, supplements, meal timing, and recovery nutrition.",
    href: "/nutrition",
    icon: Apple,
  },
  {
    title: "Decision Engine",
    description: "Practical if-then guidance for poor sleep, missed workouts, travel, and minor injuries.",
    href: "/decision-engine",
    icon: GitBranch,
  },
  {
    title: "Exercise Library",
    description: "Detailed reference pages for every exercise in the programme with transfer ratings.",
    href: "/exercise-library",
    icon: LibraryBig,
  },
  {
    title: "Scientific Appendix",
    description: "Evidence summaries on concurrent training, hypertrophy, running economy, and recovery.",
    href: "/scientific-appendix",
    icon: FlaskConical,
  },
  {
    title: "References",
    description: "Bibliography with authors, journals, and DOIs supporting every recommendation.",
    href: "/references",
    icon: BookMarked,
  },
  {
    title: "Version History",
    description: "Changelog and release notes tracking the evolution of the Atlas handbook.",
    href: "/version-history",
    icon: History,
  },
];

export default function Homepage() {
  return (
    <div className="flex flex-col flex-1">
      {/* ── Hero ── */}
      <section className="border-b border-atlas-border">
        <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-atlas-text-muted bg-atlas-surface border border-atlas-border rounded-full px-3 py-1">
              v1.0.1
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-atlas-text-primary mb-6">
            Project Atlas
          </h1>

          <p className="text-lg sm:text-xl text-atlas-text-secondary max-w-2xl mb-8 leading-relaxed">
            A documentation-first operating manual for long-term hybrid athletic
            development. Built for one athlete. Designed to last decades.
          </p>

          <p className="text-base text-atlas-text-muted max-w-xl mb-10 leading-relaxed">
            Atlas is not a workout tracker, a fitness dashboard, or an AI coach.
            It is a handbook, a single source of truth for training decisions,
            programming rationale, and the science behind every recommendation.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/blueprint"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-atlas-accent text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <BookOpen className="h-4 w-4" />
              Read the Blueprint
            </Link>
            <Link
              href="/exercise-library"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-atlas-surface border border-atlas-border text-atlas-text-secondary font-medium text-sm hover:bg-atlas-hover transition-colors"
            >
              <LibraryBig className="h-4 w-4" />
              Exercise Library
            </Link>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="border-b border-atlas-border">
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-atlas-text-primary mb-4">
            Philosophy
          </h2>
          <p className="text-base text-atlas-text-secondary max-w-2xl leading-relaxed">
            Atlas is built around one central belief:{" "}
            <strong className="text-atlas-text-primary">
              consistency beats optimisation
            </strong>
            . Most athletes fail because they continuously search for better
            programmes rather than executing good ones consistently. Atlas
            intentionally prioritises sustainability over perfection.
          </p>
          <p className="text-base text-atlas-text-secondary max-w-2xl leading-relaxed mt-4">
            Every exercise, every running session, and every nutrition
            recommendation is evaluated against a single question:{" "}
            <em className="text-atlas-text-primary">
              will this still make sense five years from now?
            </em>
          </p>
        </div>
      </section>

      {/* ── Quick Links ── */}
      <section className="border-b border-atlas-border">
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-atlas-text-primary mb-10">
            Handbook
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group flex flex-col gap-2 p-5 rounded-lg border border-atlas-border bg-atlas-surface hover:bg-atlas-hover hover:border-atlas-accent/30 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-atlas-accent shrink-0" />
                    <h3 className="text-sm font-semibold text-atlas-text-primary group-hover:text-atlas-accent transition-colors">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-sm text-atlas-text-muted leading-relaxed">
                    {section.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="border-b border-atlas-border">
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-atlas-text-primary mb-10">
            Principles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg border border-atlas-border bg-atlas-surface">
              <h3 className="text-sm font-semibold text-atlas-text-primary mb-2">
                Minimum Effective Dose
              </h3>
              <p className="text-sm text-atlas-text-muted leading-relaxed">
                Every exercise must justify its recovery cost. Maximise
                adaptation per unit of fatigue.
              </p>
            </div>
            <div className="p-5 rounded-lg border border-atlas-border bg-atlas-surface">
              <h3 className="text-sm font-semibold text-atlas-text-primary mb-2">
                Evidence-Informed
              </h3>
              <p className="text-sm text-atlas-text-muted leading-relaxed">
                Programming is guided by biomechanics, physiology, and sports
                science, not trends.
              </p>
            </div>
            <div className="p-5 rounded-lg border border-atlas-border bg-atlas-surface">
              <h3 className="text-sm font-semibold text-atlas-text-primary mb-2">
                High Return on Investment
              </h3>
              <p className="text-sm text-atlas-text-muted leading-relaxed">
                Exercises are selected by value, not popularity. Low fatigue,
                high stimulus, easy to progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Current Goals ── */}
      <section className="border-b border-atlas-border">
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-atlas-text-primary mb-10">
            Current Goals
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-atlas-border bg-atlas-surface max-w-lg">
              <span className="text-sm text-atlas-text-secondary">
                2.4 km Run
              </span>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-atlas-text-muted line-through">
                  11:40
                </span>
                <span className="text-atlas-accent font-mono font-semibold">
                  10:30
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-atlas-border bg-atlas-surface max-w-lg">
              <span className="text-sm text-atlas-text-secondary">
                Zone 2 Pace
              </span>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-atlas-text-muted line-through">
                  7:00-7:30/km
                </span>
                <span className="text-atlas-accent font-mono font-semibold">
                  6:30/km
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-atlas-border bg-atlas-surface max-w-lg">
              <span className="text-sm text-atlas-text-secondary">
                Long-Term Vision
              </span>
              <span className="text-sm text-atlas-text-muted">
                Train for decades. Not for Instagram.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Weekly Checklist ── */}
      <section className="border-b border-atlas-border">
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <div className="max-w-md">
            <WeeklyChecklist />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-atlas-border">
        <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-atlas-text-muted">
            <span className="font-mono text-xs bg-atlas-surface border border-atlas-border rounded px-2 py-0.5">
              v1.0.1
            </span>
            <span>Project Atlas</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-atlas-text-muted">
            <Link
              href="https://github.com/jungyong/projectatlas"
              className="hover:text-atlas-text-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            <Link
              href="/version-history"
              className="hover:text-atlas-text-secondary transition-colors"
            >
              Version History
            </Link>
            <span>MIT Licence</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
