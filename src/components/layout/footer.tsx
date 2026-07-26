import Link from "next/link";
import { HuberLogo } from "@/components/brand/logo";
import { SITE } from "@/lib/site";

const COMPANY_LINKS = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Tools", href: "/tools" },
  { name: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  { name: "Product engineering", href: "/services#product-engineering" },
  { name: "White label engineering", href: "/services#white-label" },
  { name: "AI engineering", href: "/services#ai-engineering" },
  { name: "Mobile and web3", href: "/services#mobile-apps" },
];

export function Footer() {
  return (
    <footer className="bg-steel-900 text-ground">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-16 md:px-10 md:pt-[72px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Huber Software home">
              <HuberLogo size={28} variant="inverse" />
            </Link>
            <p className="max-w-xs text-[14.5px] leading-relaxed text-neutral-400">
              A family of three covering engineering, brand and sales. Ten
              years of production software behind it.
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-500">
              COMPANY
            </div>
            {COMPANY_LINKS.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="text-[14.5px] text-neutral-400 transition-colors hover:text-ground"
              >
                {l.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-500">
              SERVICES
            </div>
            {SERVICE_LINKS.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="text-[14.5px] text-neutral-400 transition-colors hover:text-ground"
              >
                {l.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-500">
              GET IN TOUCH
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="text-[14.5px] text-neutral-400 transition-colors hover:text-ground"
            >
              {SITE.email}
            </a>
            <span className="text-[14.5px] text-neutral-400">
              {SITE.locationLine}
            </span>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-ground/20 pt-6">
          <div className="font-heading text-[10.5px] tracking-wordmark text-neutral-500">
            © {new Date().getFullYear()} HUBER SOFTWARE LLC
          </div>
          <div className="flex gap-7">
            <Link
              href="/privacy"
              className="text-[13px] text-neutral-500 transition-colors hover:text-ground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[13px] text-neutral-500 transition-colors hover:text-ground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
