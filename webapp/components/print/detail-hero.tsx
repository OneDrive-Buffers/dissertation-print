type DetailHeroProps = {
  label: string;
  title: string;
  summary: string;
  eyebrow?: string;
  meta?: string[];
};

export function DetailHero({
  label,
  title,
  summary,
  eyebrow,
  meta = [],
}: DetailHeroProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
          {label}
        </p>
        <h1 className="mt-4 max-w-3xl font-[var(--font-display)] text-5xl font-semibold leading-[0.96] text-balance text-white sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{summary}</p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {meta.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 text-sm text-white">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
