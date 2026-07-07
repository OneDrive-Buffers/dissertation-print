import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailHero } from "@/components/print/detail-hero";
import { IssueCard } from "@/components/print/issue-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Section } from "@/components/layout/section";
import {
  getIssuesForVolume,
  getLine,
  getVolume,
  printVolumes,
} from "@/content/print-data";

type VolumePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return printVolumes.map((volume) => ({ slug: volume.slug }));
}

export async function generateMetadata({
  params,
}: VolumePageProps): Promise<Metadata> {
  const { slug } = await params;
  const volume = getVolume(slug);

  if (!volume) {
    return { title: "Volume not found" };
  }

  return {
    title: `${volume.title} | Origin Continuum Print`,
    description: volume.summary,
  };
}

export default async function VolumePage({ params }: VolumePageProps) {
  const { slug } = await params;
  const volume = getVolume(slug);

  if (!volume) {
    notFound();
  }

  const line = getLine(volume.lineSlug);
  const issues = getIssuesForVolume(volume.slug);

  return (
    <>
      <SiteHeader />
      <main>
        <Section className="bg-[var(--bg-dark)] text-white" contentClassName="hero-grid py-16 sm:py-18 lg:py-22">
          <DetailHero
            label={`Volume ${volume.index}`}
            title={volume.title}
            summary={volume.summary}
            eyebrow={line ? `Inside ${line.title}` : "Print volume"}
            meta={[
              `Status: ${volume.status}`,
              `Themes: ${volume.themes.join(", ")}`,
              volume.editorialDirection,
            ]}
          />
        </Section>

        <Section>
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Volume direction
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">{volume.editorialDirection}</p>
            </article>
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Belongs to
              </p>
              {line ? (
                <Link href={`/lines/${line.slug}`} className="mt-4 block font-[var(--font-display)] text-3xl text-slate-950 hover:text-indigo-700">
                  {line.title}
                </Link>
              ) : null}
              <p className="mt-3 text-base leading-8 text-slate-600">
                The line page gives the wider rationale, while the volume page holds progression and issue grouping together.
              </p>
            </article>
          </div>
        </Section>

        <Section className="bg-[var(--surface-muted)]/45">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-[var(--font-display)] text-4xl font-semibold text-slate-950 sm:text-5xl">
              Issues in this volume
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
              This volume already has a clear role in the route, but its public issue pages have not been filled in yet.
            </div>
          )}
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
