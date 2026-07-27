import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Blueprint, Kicker } from "@/components/brand/datum";
import { JsonLd, breadcrumbs } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Work | Platforms We Built and Still Maintain",
  description:
    "Case studies with receipts: a claims platform with three portals on AWS, a consumer app live on both stores, and a production AI support platform. Every claim links to its source.",
  alternates: { canonical: "/work" },
};

const STUDIES: Array<{
  kicker: string;
  title: string;
  href: string;
  label: string;
  summary: string;
  facts: string[];
  image?: string;
  alt?: string;
}> = [
  {
    kicker: "CLIENT PLATFORM",
    title: "Bluegrass Damage Appraisal",
    href: "/work/bluegrass-damage-appraisal",
    label: "CLAIMS PLATFORM",
    summary:
      "A claim management platform: one backend API, three user portals, AWS infrastructure and CI/CD, shipped to production in six months.",
    facts: ["6 MONTHS", "3 PORTALS", "5.0 REVIEW"],
    image: "/work/bluegrass.webp",
    alt: "Bluegrass Damage Appraisal admin portal: claims and revenue dashboard",
  },
  {
    kicker: "OUR PRODUCT",
    title: "Helio",
    href: "/work/helio",
    label: "HELIO",
    summary:
      "AI powered machine monitoring for American manufacturers. Our own industrial IoT product: hardware in the plant, intelligence on top, downtime caught before it costs a shift.",
    facts: ["INDUSTRIAL IOT", "AI MONITORING", "LIVE"],
    image: "/work/helio.webp",
    alt: "helioiot.com homepage: Helio makes machines make sense",
  },
  {
    kicker: "OUR PRODUCT",
    title: "The Trick Book",
    href: "/work/trick-book",
    label: "TRICK BOOK APP",
    summary:
      "Our own consumer platform for action sports, taken from idea to both app stores to marketing, with AI companions as the flagship feature.",
    facts: ["APP STORE", "GOOGLE PLAY", "3,800+ SPOTS"],
    image: "/work/trick-book.webp",
    alt: "thetrickbook.com homepage: your board, your data, your crew",
  },
  {
    kicker: "CLIENT PLATFORM",
    title: "AI Support Platform",
    href: "/work/ai-support-platform",
    label: "AI PLATFORM",
    summary:
      "A production LangGraph orchestrator serving voice and chat support for a consumer software company, with retrieval, evals and secure account operations.",
    facts: ["VOICE + CHAT", "RAG", "EVALS"],
  },
];

export default function WorkPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-5 py-20 md:px-10 md:py-24">
      <JsonLd data={breadcrumbs([{ name: "Work", path: "/work" }])} />
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-[72px]">
        <div className="flex flex-col gap-6">
          <Kicker className="tracking-label">Selected work</Kicker>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] md:text-6xl">
            Built, shipped, still running.
          </h1>
        </div>
        <p className="text-[17px] leading-[1.75] text-neutral-700 lg:pt-12">
          We only show work we can stand behind with receipts. Client stories
          link the verified review they came from, and our own products link
          the live thing itself.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {STUDIES.map((s) => (
          <Link key={s.href} href={s.href} className="group">
            <Blueprint className="grid gap-px bg-divider md:grid-cols-[1.1fr_2fr]">
              {s.image ? (
                <div className="relative min-h-[180px]">
                  <Image
                    src={s.image}
                    alt={s.alt ?? s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="hatch flex min-h-[180px] items-end p-4">
                  <span className="font-heading text-[10px] tracking-wordmark text-neutral-600">
                    {s.label}
                  </span>
                </div>
              )}
              <div className="flex flex-col justify-between gap-6 bg-ground p-8">
                <div className="flex flex-col gap-2.5">
                  <div className="font-heading text-[10px] font-semibold tracking-kicker text-steel-700">
                    {s.kicker}
                  </div>
                  <h2 className="font-heading text-3xl leading-tight transition-colors group-hover:text-steel-700">
                    {s.title}
                  </h2>
                  <p className="max-w-2xl text-[15px] leading-[1.7] text-neutral-700">
                    {s.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {s.facts.map((f) => (
                    <span
                      key={f}
                      className="font-heading text-[10.5px] tracking-wordmark text-neutral-600"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Blueprint>
          </Link>
        ))}
      </div>
    </div>
  );
}
