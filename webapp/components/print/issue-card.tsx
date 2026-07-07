import Link from "next/link";
import { PrintIssue } from "@/content/print-data";

export function IssueCard({ issue }: { issue: PrintIssue }) {
  return (
    <Link
      href={`/issues/${issue.slug}`}
      className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1 hover:border-slate-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Issue {issue.index}
          </p>
          <h3 className="mt-2 font-[var(--font-display)] text-2xl text-slate-950">{issue.title}</h3>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          {issue.status}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{issue.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {issue.focus.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="mt-6 text-sm font-semibold text-slate-950">See the issue page</p>
    </Link>
  );
}
