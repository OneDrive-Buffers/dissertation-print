export function HeroVisual() {
  return (
    <div className="circuit-panel stars relative overflow-hidden rounded-[2rem] border border-white/10 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(94,224,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,196,94,0.2),transparent_34%)]" />
      <div className="relative grid gap-4">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Printed issue</p>
          <h3 className="mt-3 font-[var(--font-display)] text-2xl text-white">
            Read the concept.
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Editorial pacing, tactile annotation, and guided attention on paper.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_0.72fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-200">QR bridge</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["Scan", "Trace", "Continue"].map((step) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/10 bg-white/6 px-3 py-5 text-center text-sm font-semibold text-white"
                >
                  {step}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Every code can open a recap, an interactive exercise, a concept graph, or the next guided branch.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/10 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Web continuation</p>
            <div className="mt-4 space-y-3">
              {[
                "Line overview",
                "Volume route",
                "Issue extensions",
                "Bibliographic notes",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 px-3 py-3 text-sm text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
