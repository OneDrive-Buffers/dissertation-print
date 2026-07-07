import Link from "next/link";
import { EditorialLine } from "@/content/print-data";

export function LineCard({ line }: { line: EditorialLine }) {
  return (
    <Link
      href={`/lines/${line.slug}`}
      className="group rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1 hover:border-slate-300"
    >
      <div className={`h-2 w-24 rounded-full ${line.accent}`} />
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        Editorial line
      </p>
      <h3 className="mt-3 font-[var(--font-display)] text-3xl text-slate-950">{line.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{line.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
        <span>{line.volumeSlugs.length} volumes</span>
        <span>•</span>
        <span>{line.status}</span>
      </div>
      <p className="mt-6 text-sm font-semibold text-slate-950 transition group-hover:text-indigo-700">
        Open the line
      </p>
    </Link>
  );
}
