import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Blueprint,
  Kicker,
  PrimaryCta,
  SecondaryCta,
  SectionHeader,
} from "@/components/brand/datum";
import { STATS } from "@/lib/stats";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} | Enterprise Grade Software for Teams That Are Not Enterprises Yet`,
  description:
    "A three person product team. Wes builds the software, Kat builds the brand, Tripp builds the pipeline. Product engineering, AI engineering, and white label development from Long Beach, California.",
  alternates: { canonical: "/" },
};

const TRUSTED_BY = [
  "Bluegrass Damage Appraisal",
  "TechInnovators",
  "Interact Brands",
  "The Trick Book",
];

const WORK: Array<{
  kicker: string;
  title: string;
  href: string;
  label: string;
  body: string;
  image?: string;
  alt?: string;
}> = [
  {
    kicker: "CLIENT PLATFORM",
    title: "Bluegrass Damage Appraisal",
    href: "/work/bluegrass-damage-appraisal",
    label: "CLAIMS PLATFORM",
    body: "A claim management platform built over six months. One backend API, three separate user portals for appraisers, adjusters and clients, AWS infrastructure and CI/CD pipelines that let us ship the same day a problem shows up.",
    image: "/work/bluegrass-claims.webp",
    alt: "Bluegrass Damage Appraisal admin portal: the claims management table",
  },
  {
    kicker: "OUR PRODUCT",
    title: "Helio",
    href: "/work/helio",
    label: "HELIO",
    body: "AI powered machine monitoring for American manufacturers, built and run by us. Every architecture call we recommend to you is one we already live with ourselves, from edge hardware to the models on top.",
    image: "/work/helio.webp",
    alt: "helioiot.com homepage: Helio makes machines make sense",
  },
  {
    kicker: "OUR PRODUCT",
    title: "The Trick Book",
    href: "/work/trick-book",
    label: "TRICK BOOK APP",
    body: "A trick progression platform for skateboarders, snowboarders, BMX riders and surfers. Live on the App Store and Google Play, with a spot map of 3,800+ locations and AI companions that know your progression.",
    image: "/work/trick-book.webp",
    alt: "thetrickbook.com homepage: your board, your data, your crew",
  },
];

const TEAM = [
  {
    name: "Wes Huber",
    role: "FOUNDER, SOFTWARE AND AI",
    body: "Formally trained software engineer, product manager and AI engineer. Ten years of taking things from a sketch to a production platform other people depend on. He does the architecture, writes the code and owns the deploy.",
    image: "/team/wes.webp",
  },
  {
    name: "Kathleen Huber",
    role: "BRAND AND MARKETING",
    body: "Kat makes sure the thing we build is something people understand and want. Positioning, naming, brand system, launch copy and the campaigns after launch.",
    image: "/team/kat.webp",
  },
  {
    name: "Tripp Huber",
    role: "PARTNERSHIPS AND SALES",
    body: "Tripp finds the partners and the customers. If your product needs distribution as much as it needs code, this is the part most engineering firms cannot help you with.",
    image: "/team/tripp.webp",
  },
];

const REVIEWS = [
  {
    quote:
      "Wes built out a substantial full-stack platform over a six-month engagement, including backend API, three user portals, AWS infrastructure, and CI/CD pipelines. He was responsive to feedback and willing to put in long hours when production issues came up.",
    name: "Cody Underwood",
    org: "Bluegrass Damage Appraisal",
  },
  {
    quote:
      "Wes is a highly engaged and sharp developer who proactively analyzes systems and naturally looks for optimizations.",
    name: "Armando Farr",
    org: "TechInnovators",
  },
  {
    quote:
      "Wes has fantastic web development skills and web development knowledge. I am happy with his work on both my websites.",
    name: "Verified client",
    org: "Two website builds",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-20 pt-16 md:px-10 md:pb-[88px] md:pt-[108px]">
        <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-[72px]">
          <div className="flex flex-col gap-7">
            <Kicker className="tracking-label">
              Product engineering &nbsp;/&nbsp; {SITE.locationLine}
            </Kicker>
            <h1 className="font-heading text-5xl font-semibold leading-[1.02] md:text-6xl lg:text-[74px]">
              Enterprise grade software for teams that are not enterprises yet.
            </h1>
            <p className="max-w-lg text-lg leading-[1.7] text-neutral-700">
              We are a family of three who cover a whole product between us.
              Wes builds it, Kat gives it a brand and an audience, Tripp opens
              the doors. You get a working platform in production, not a
              prototype and an invoice.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <PrimaryCta href="/contact">Book a call with Wes</PrimaryCta>
              <SecondaryCta href="/services">See what we do</SecondaryCta>
            </div>
          </div>

          <Blueprint className="flex flex-col divide-y divide-divider bg-divider">
            {STATS.map((s) => (
              <Link
                key={s.label}
                href={s.sourceUrl}
                className="flex flex-col gap-1.5 bg-ground px-6 py-6 transition-colors hover:bg-surface"
                {...(s.sourceUrl.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <div className="font-heading text-4xl font-semibold leading-none text-steel-700">
                  {s.value}
                </div>
                <div className="text-[13.5px] leading-snug text-neutral-600">
                  {s.label}
                </div>
              </Link>
            ))}
          </Blueprint>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-divider bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-3 px-5 py-6 md:px-10">
          <span className="font-heading text-[10.5px] font-semibold uppercase tracking-kicker text-neutral-600">
            Trusted by
          </span>
          {TRUSTED_BY.map((name, i) => (
            <span key={name} className="flex items-center gap-10">
              <span className="text-[15px] text-neutral-700">{name}</span>
              {i < TRUSTED_BY.length - 1 && (
                <span className="hidden h-3.5 w-px bg-divider sm:block" />
              )}
            </span>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 md:px-10 md:py-24">
        <SectionHeader
          kicker="Selected work"
          title="Three things we built and still maintain."
        />
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {WORK.map((w) => (
            <Link key={w.title} href={w.href} className="group flex flex-col gap-4">
              {w.image ? (
                <Blueprint className="relative aspect-[4/3]">
                  <Image
                    src={w.image}
                    alt={w.alt ?? w.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </Blueprint>
              ) : (
                <Blueprint className="hatch flex aspect-[4/3] items-end p-4">
                  <span className="font-heading text-[10px] tracking-wordmark text-neutral-600">
                    {w.label}
                  </span>
                </Blueprint>
              )}
              <div className="flex flex-col gap-2">
                <div className="font-heading text-[10px] font-semibold tracking-kicker text-steel-700">
                  {w.kicker}
                </div>
                <h3 className="font-heading text-2xl leading-tight transition-colors group-hover:text-steel-700">
                  {w.title}
                </h3>
                <p className="text-[14.5px] leading-[1.7] text-neutral-700">
                  {w.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-steel-900 text-ground">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
          <div className="grid gap-4 md:grid-cols-[200px_1fr] md:items-end md:gap-12">
            <div className="font-heading text-[11px] font-semibold uppercase tracking-kicker text-steel-400">
              The team
            </div>
            <h2 className="max-w-xl font-heading text-3xl font-semibold leading-tight md:text-[40px]">
              You will know all three of us by name.
            </h2>
          </div>
          <div className="mt-14 grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.name} className="flex flex-col gap-4">
                <Blueprint light className="relative aspect-square border-ground/20">
                  <div className="duotone absolute inset-0">
                    <Image
                      src={m.image}
                      alt={`Portrait of ${m.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </Blueprint>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-2xl">{m.name}</h3>
                  <div className="font-heading text-[10px] font-semibold tracking-kicker text-steel-400">
                    {m.role}
                  </div>
                  <p className="text-[14.5px] leading-[1.7] text-neutral-400">
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 md:px-10 md:py-24">
        <SectionHeader kicker="In their words" title="What clients actually said." />
        <Blueprint className="mt-12 grid gap-px bg-divider md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="flex flex-col justify-between gap-6 bg-ground p-8"
            >
              <p className="font-heading text-xl font-semibold leading-normal">
                {r.quote}
              </p>
              <div>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="mt-1 text-[13px] text-neutral-600">{r.org}</div>
              </div>
            </div>
          ))}
        </Blueprint>
        <p className="mt-5 text-[13.5px] text-neutral-600">
          Quotes are from verified reviews on{" "}
          <a
            href="https://www.upwork.com/freelancers/~01387050d017e0878f"
            target="_blank"
            rel="noopener noreferrer"
            className="text-steel-700 underline underline-offset-4"
          >
            Wes&apos;s Upwork profile
          </a>
          , where the rating is 5.0 across 86 jobs.
        </p>
      </section>

      {/* CTA band */}
      <section className="border-t border-divider bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-10 px-5 py-16 md:px-10 md:py-[88px]">
          <div className="flex max-w-xl flex-col gap-3.5">
            <h2 className="font-heading text-3xl font-semibold leading-tight md:text-[40px]">
              Tell us what you are trying to ship.
            </h2>
            <p className="text-base leading-[1.7] text-neutral-700">
              Thirty minutes with Wes, no deck, no discovery fee. You will
              leave with a straight answer on scope, cost and whether we are
              the right shop for it.
            </p>
          </div>
          <PrimaryCta href="/contact" className="px-9 py-[18px] text-base">
            Book a call
          </PrimaryCta>
        </div>
      </section>
    </div>
  );
}
