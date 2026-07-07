import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailHero } from "@/components/print/detail-hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Section } from "@/components/layout/section";
import {
  getIssue,
  getLine,
  getVolume,
  printIssues,
} from "@/content/print-data";

type IssuePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return printIssues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({
  params,
}: IssuePageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssue(slug);

  if (!issue) {
    return { title: "Issue not found" };
  }

  return {
    title: `${issue.title} | Origin Continuum Print`,
    description: issue.summary,
  };
}

export default async function IssuePage({ params }: IssuePageProps) {
  const { slug } = await params;
  const issue = getIssue(slug);

  if (!issue) {
    notFound();
  }

  const line = getLine(issue.lineSlug);
  const volume = getVolume(issue.volumeSlug);

  return (
    <>
      <SiteHeader />
      <main>
        <Section className="bg-[var(--bg-dark)] text-white" contentClassName="hero-grid py-16 sm:py-18 lg:py-22">
          <DetailHero
            label={`Issue ${issue.index}`}
            title={issue.title}
            summary={issue.summary}
            eyebrow={volume ? `Volume ${volume.index}: ${volume.title}` : "Print issue"}
            meta={[
              `Status: ${issue.status}`,
              `Focus: ${issue.focus.join(", ")}`,
              issue.routeNote,
            ]}
          />
        </Section>

        <Section>
          <div className="grid gap-6 xl:grid-cols-3">
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] xl:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Issue structure
              </p>
              <div className="mt-5 space-y-4">
                {issue.structure.map((item) => (
                  <div key={item} className="rounded-2xl bg-[var(--surface-muted)] px-4 py-4 text-sm leading-7 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
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
              {volume ? (
                <Link href={`/volumes/${volume.slug}`} className="mt-3 block text-base font-semibold text-slate-700 hover:text-indigo-700">
                  Volume {volume.index}: {volume.title}
                </Link>
              ) : null}
              <p className="mt-4 text-sm leading-7 text-slate-600">{issue.bibliographyAngle}</p>
            </article>
          </div>
        </Section>

        <Section className="bg-[var(--surface-muted)]/45">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                QR experiences
              </p>
              <div className="mt-5 space-y-4">
                {issue.qrExperiences.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 px-4 py-4 text-sm leading-7 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Why this page matters
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                This issue page is the stable public landing target that lets each printed QR code point
                somewhere durable: a recap, a mini-tool, a bibliography note, or the next challenge in the route.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                That keeps the physical magazine focused and memorable while the web layer carries the extra
                interactivity, explanation, and structured continuation.
              </p>
            </article>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
