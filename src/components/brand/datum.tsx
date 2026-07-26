import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Four registration marks for a .blueprint wrapper. */
export function Corners() {
  return (
    <>
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />
    </>
  );
}

/* Wireframe-framed object per the brand guidelines Framing section. */
export function Blueprint({
  children,
  className,
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("blueprint", light && "blueprint-light", className)}>
      {children}
      <Corners />
    </div>
  );
}

/* Small technical label: Barlow Condensed, uppercase, tracked, Neutral 600. */
export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-heading text-[11px] font-semibold uppercase tracking-kicker text-neutral-600",
        className
      )}
    >
      {children}
    </div>
  );
}

/* Section header row: kicker column + heading, per the design doc grid. */
export function SectionHeader({
  kicker,
  title,
  className,
  dark = false,
}: {
  kicker: string;
  title: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-[200px_1fr] md:items-end md:gap-12",
        className
      )}
    >
      <Kicker className={dark ? "text-steel-400" : undefined}>{kicker}</Kicker>
      <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight md:text-[40px]">
        {title}
      </h2>
    </div>
  );
}

/* Primary CTA: the one solid object in the system, blueprint-framed. */
export function PrimaryCta({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "blueprint inline-flex items-center justify-center gap-2 bg-steel px-7 py-4 font-heading text-[15px] font-semibold text-ground transition-colors hover:bg-steel-600 active:bg-steel-700",
        className
      )}
    >
      {children}
      <Corners />
    </Link>
  );
}

export function SecondaryCta({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center border border-divider px-6 py-4 font-heading text-[15px] font-semibold text-ink transition-colors hover:bg-ink/5 active:bg-ink/10",
        className
      )}
    >
      {children}
    </Link>
  );
}

/* Chip fill tag (Steel 100 on Steel 800 text). */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="bg-steel-100 px-3 py-1 font-heading text-[11px] tracking-wordmark text-steel-800">
      {children}
    </span>
  );
}
