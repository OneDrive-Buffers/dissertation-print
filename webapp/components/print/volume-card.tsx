import Link from "next/link";
import { PrintVolume } from "@/content/print-data";

export function VolumeCard({ volume }: { volume: PrintVolume }) {
  return (
    <Link
      href={`/volumes/${volume.slug}`}
      className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1 hover:border-slate-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Volume {volume.index}
          </p>
          <h3 className="mt-2 font-[var(--font-display)] text-2xl text-slate-950">{volume.title}</h3>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
          {volume.status}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{volume.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {volume.themes.map((theme) => (
          <span
            key={theme}
            className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-slate-700"
          >
            {theme}
          </span>
        ))}
      </div>
    </Link>
  );
}
