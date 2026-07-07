import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "light" | "outline" | "ghost" | "accent";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5",
    variant === "primary" &&
      "bg-slate-950 text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] hover:bg-slate-800",
    variant === "light" &&
      "bg-white text-slate-950 shadow-[0_18px_45px_rgba(255,255,255,0.14)] hover:bg-slate-100",
    variant === "outline" &&
      "border border-slate-300 bg-white/80 text-slate-950 hover:bg-slate-100",
    variant === "ghost" &&
      "border border-white/18 bg-white/6 text-white hover:bg-white/12",
    variant === "accent" &&
      "bg-cyan-300 text-slate-950 shadow-[0_18px_45px_rgba(94,224,255,0.24)] hover:bg-cyan-200",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  );
}
