const qrSteps = [
  {
    title: "Scan from paper",
    body:
      "A stable QR target turns a margin note, exercise marker, or final challenge into a live page instead of a dead citation.",
  },
  {
    title: "Land on context",
    body:
      "The page explains where the reader is inside the line, volume, and issue so the digital layer never feels detached from the printed artifact.",
  },
  {
    title: "Choose the extension",
    body:
      "Readers can open recaps, interactive tasks, bibliography trails, or a next-step route depending on how deep they want to go.",
  },
  {
    title: "Return with momentum",
    body:
      "The web layer feeds back into the magazine rhythm, helping the reader keep memory, structure, and progression visible.",
  },
];

export function QrFlow() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {qrSteps.map((step, index) => (
        <article
          key={step.title}
          className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5 text-white"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Step {index + 1}
          </p>
          <h3 className="mt-3 font-[var(--font-display)] text-2xl">{step.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{step.body}</p>
        </article>
      ))}
    </div>
  );
}
