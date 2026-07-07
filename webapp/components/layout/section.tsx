import { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
};

export function Section({
  children,
  className,
  contentClassName,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn("section-shell", className)}>
      <div className={cn("mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24", contentClassName)}>
        {children}
      </div>
    </section>
  );
}
