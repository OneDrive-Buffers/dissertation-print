import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailHero } from "@/components/print/detail-hero";
import { IssueCard } from "@/components/print/issue-card";
import { VolumeCard } from "@/components/print/volume-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Section } from "@/components/layout/section";
import {
  getIssuesForLine,
  getLine,
  getVolumesForLine,
  printLines,
} from "@/content/print-data";

type LinePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return printLines.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({
  params,
}: LinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const line = getLine(slug);

  if (!line) {
    return { title: "Line not found" };
  }

  return {
    title: `${line.title} | Origin Continuum Print`,
    description: line.summary,
  };
}

export default async function LinePage({ params }: LinePageProps) {
  const { slug } = await params;
  const line = getLine(slug);

  if (!line) {
    notFound();
  }

  const volumes = getVolumesForLine(line.slug);
  const issues = getIssuesForLine(line.slug);

  return (
    <>
      <SiteHeader />
      <main>
        <Section className="bg-[var(--bg-dark)] text-white" contentClassName="hero-grid py-16 sm:py-18 lg:py-22">
          <DetailHero
            label="Editorial line"
            title={line.title}
            summary={line.summary}
            eyebrow="How this line works"
            meta={[line.position, line.qrPromise, line.bibliographyBridge]}
          />
        </Section>

        <Section>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Editorial stance
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">{line.position}</p>
            </article>
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                QR and bibliography bridge
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {line.qrPromise} {line.bibliographyBridge}
              </p>
            </article>
          </div>
        </Section>

        <Section className="bg-[var(--surface-muted)]/45">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-[var(--font-display)] text-4xl font-semibold text-slate-950 sm:text-5xl">
              Volumes in this line
            </h2>
          </div>
          {volumes.length ? (
            <div className="grid gap-6 xl:grid-cols-2">
              {volumes.map((volume) => (
                <VolumeCard key={volume.slug} volume={volume} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-slate-600 shadow-[var(--shadow-soft)]">
              This line is still being structured publicly. Its page already defines the framing for future volumes.
            </div>
          )}
        </Section>

        <Section>
          <div className="mb-10 max-w-3xl">
            <h2 className="font-[var(--font-display)] text-4xl font-semibold text-slate-950 sm:text-5xl">
              Available issues
            </h2>
          </div>
          {issues.length ? (
            <div className="grid gap-6 xl:grid-cols-2">
              {issues.map((issue) => (
                <IssueCard key={issue.slug} issue={issue} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-slate-600 shadow-[var(--shadow-soft)]">
              No public issues are listed yet, but the route architecture is already in place.
            </div>
          )}
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
