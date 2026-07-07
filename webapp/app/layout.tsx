import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Origin Continuum Print",
  description:
    "A print-first web companion for editorial lines, volumes, issues, and QR-linked interactive continuations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full bg-[var(--bg-light)] text-[var(--text-strong)] antialiased">
        {children}
      </body>
    </html>
  );
}
