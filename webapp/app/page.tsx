import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Section } from "@/components/layout/section";
import { HeroVisual } from "@/components/print/hero-visual";
import { IssueCard } from "@/components/print/issue-card";
import { LineCard } from "@/components/print/line-card";
import { QrFlow } from "@/components/print/qr-flow";
import { VolumeCard } from "@/components/print/volume-card";
import { Button } from "@/components/ui/button";
import {
  printIssues,
  printLines,
  printNarrative,
  printVolumes,
} from "@/content/print-data";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section className="bg-[var(--bg-dark)] text-white" contentClassName="hero-grid py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <h1 className="max-w-3xl font-[var(--font-display)] text-5xl font-semibold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
                {printNarrative.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {printNarrative.heroSubtitle}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button
                  href="#lines"
                  variant="primary"
                  className="border border-white/10 bg-slate-900 shadow-[0_20px_45px_rgba(0,0,0,0.24)] hover:bg-slate-800"
                >
                  Explore the lines
                </Button>
                <Button href="#qr-journey" variant="ghost">
                  See the QR journey
                </Button>
              </div>
            </div>
            <HeroVisual />
          </div>
        </Section>

        <Section id="lines">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-[var(--font-display)] text-4xl font-semibold text-slate-950 sm:text-5xl">
              {printNarrative.linesTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              {printNarrative.linesSubtitle}
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            {printLines.map((line) => (
              <LineCard key={line.slug} line={line} />
            ))}
          </div>
        </Section>

        <Section id="volumes" className="bg-[var(--surface-muted)]/45">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-[var(--font-display)] text-4xl font-semibold text-slate-950 sm:text-5xl">
              {printNarrative.volumesTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              {printNarrative.volumesSubtitle}
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            {printVolumes.map((volume) => (
              <VolumeCard key={volume.slug} volume={volume} />
            ))}
          </div>
        </Section>

        <Section id="issues">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-[var(--font-display)] text-4xl font-semibold text-slate-950 sm:text-5xl">
              {printNarrative.issuesTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              {printNarrative.issuesSubtitle}
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            {printIssues.map((issue) => (
              <IssueCard key={issue.slug} issue={issue} />
            ))}
          </div>
        </Section>

        <Section id="qr-journey" className="bg-[var(--bg-dark)] text-white">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
              Print and web bridge
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-4xl font-semibold sm:text-5xl">
              QR codes are part of the structure, not an afterthought.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
              The print layer fits the broader initiative: concept orientation, visible progression, and
              interactive continuations shaped by the same educational logic found throughout the project’s
              bibliographies and landing materials.
            </p>
          </div>
          <QrFlow />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
