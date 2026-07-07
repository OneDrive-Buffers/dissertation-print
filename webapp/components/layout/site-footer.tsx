import Link from "next/link";
import { Section } from "./section";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Editorial lines", href: "/#lines" },
      { label: "Volumes", href: "/#volumes" },
      { label: "Issues", href: "/#issues" },
      { label: "QR journey", href: "/#qr-journey" },
    ],
  },
  {
    title: "Key pages",
    links: [
      { label: "CodeQuest", href: "/lines/codequest" },
      { label: "Essentials", href: "/volumes/codequest-essentials" },
      { label: "From Variables to Squares", href: "/issues/from-variables-to-squares" },
    ],
  },
];

export function SiteFooter() {
  return (
    <Section className="border-t border-slate-200 bg-white" contentClassName="py-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">
            Origin Continuum Print
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-slate-950">
            Printed learning, structured progression, and stable digital companions.
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link className="transition hover:text-slate-950" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
