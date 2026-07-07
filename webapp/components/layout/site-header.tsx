import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Lines", href: "/#lines" },
  { label: "Volumes", href: "/#volumes" },
  { label: "Issues", href: "/#issues" },
  { label: "QR Journey", href: "/#qr-journey" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(11,16,38,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            Origin Continuum Print
          </p>
          <p className="truncate font-[var(--font-display)] text-2xl text-white">
            Print that opens into the web
          </p>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="#issues" variant="light" className="shrink-0">
          Browse the issues
        </Button>
      </div>
    </header>
  );
}
