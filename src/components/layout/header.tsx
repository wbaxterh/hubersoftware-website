"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { HuberLogo } from "@/components/brand/logo";

const NAV = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Tools", href: "/tools" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-ground/90 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-6xl items-center justify-between gap-8 px-5 md:px-10">
        <Link href="/" className="flex items-center" aria-label="Huber Software home">
          <HuberLogo size={28} />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="group flex flex-col gap-[5px] text-sm text-ink transition-colors hover:text-steel-700"
            >
              {item.name}
              <span
                className={`h-px bg-steel transition-opacity ${
                  isActive(item.href) ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                }`}
              />
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-steel px-5 py-2.5 font-heading text-[13.5px] font-semibold text-ground transition-colors hover:bg-steel-600"
          >
            Book a call
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav
          className="border-t border-divider bg-ground px-5 pb-6 pt-2 md:hidden"
          aria-label="Mobile"
        >
          {NAV.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`block border-b border-divider py-3.5 text-base ${
                isActive(item.href) ? "text-steel-700" : "text-ink"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-5 block bg-steel px-5 py-3.5 text-center font-heading text-[15px] font-semibold text-ground"
          >
            Book a call
          </Link>
        </nav>
      )}
    </header>
  );
}
