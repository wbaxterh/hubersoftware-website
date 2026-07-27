import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Blueprint, Kicker } from "@/components/brand/datum";

export const metadata: Metadata = {
  title: "Tools and Products | Things We Built Because We Needed Them",
  description:
    "Free utilities with no signup, products we run as a business, and open source you can read before you hire us. PDF merger, NDA e-signature, The Trick Book, and public repositories.",
  alternates: { canonical: "/tools" },
};

const PRODUCTS = [
  {
    title: "Helio",
    status: "LIVE",
    href: "https://helioiot.com",
    image: "/work/helio.webp",
    alt: "helioiot.com homepage: Helio makes machines make sense",
    body: "AI powered machine monitoring for American manufacturers. Intelligence on top of the equipment itself: extend machine life, cut unplanned downtime, and catch failures before they cost a shift.",
  },
  {
    title: "The Trick Book",
    status: "LIVE",
    href: "https://thetrickbook.com",
    image: "/work/trick-book.webp",
    alt: "thetrickbook.com homepage: your board, your data, your crew",
    body: "A trick progression platform for skateboarders, snowboarders, BMX riders and surfers. React Native apps on both stores, a Next.js web app, and an Express backend on AWS, with a 3,800+ spot map and AI companions.",
  },
];

const UTILITIES = [
  {
    title: "PDF Merger",
    href: "/tools/pdf-merger",
    body: "Combine PDFs, PNGs and JPGs into one document. Drag, drop, download. Files are processed for the merge and not kept.",
  },
  {
    title: "NDA Signing",
    href: "/nda-sign",
    body: "Sign a mutual NDA electronically. Typed signature, SHA-256 document integrity, full audit trail, and a PDF copy by email.",
  },
];

const REPOS = [
  {
    name: "teams2kb",
    href: "https://github.com/wbaxterh/teams2kb",
    body: "Retrieval ready exports for Microsoft Teams chats. Markdown and JSONL contracts for RAG pipelines.",
  },
  {
    name: "basilisk",
    href: "https://github.com/wbaxterh/basilisk",
    body: "Cardano analytics platform with a free public API and the first hosted MCP server for Cardano market data.",
  },
  {
    name: "kith",
    href: "https://github.com/wbaxterh/kith",
    body: "Runtime agnostic voice framework for AI companions, published on npm.",
  },
  {
    name: "pokedocs",
    href: "https://github.com/wbaxterh/pokedocs",
    body: "Agent native documentation framework built as a distribution on top of Docusaurus.",
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 py-20 md:gap-[72px] md:px-10 md:py-24">
      {/* Intro */}
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-[72px]">
        <div className="flex flex-col gap-6">
          <Kicker className="tracking-label">Tools and products</Kicker>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] md:text-6xl">
            Things we built because we needed them.
          </h1>
        </div>
        <p className="text-[17px] leading-[1.75] text-neutral-700 lg:pt-12">
          Some of these are free utilities, some are products we run as a
          business, some are open source. All of them are the same answer to
          the same question, which is whether we can actually do the thing we
          say we can do.
        </p>
      </div>

      {/* Products */}
      <div className="flex flex-col gap-8">
        <Kicker>Our products</Kicker>
        <div className="grid gap-7 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <Blueprint key={p.title} className="flex flex-col bg-ground">
              <div className="relative aspect-[16/10] border-b border-divider">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col gap-2.5 p-7">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-heading text-[26px]">{p.title}</h2>
                  <span className="font-heading text-[10px] tracking-wordmark text-steel-700">
                    {p.status}
                  </span>
                </div>
                <p className="text-[14.5px] leading-[1.7] text-neutral-700">
                  {p.body}
                </p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 font-heading text-[10.5px] tracking-wordmark text-steel-700 hover:text-steel-800"
                >
                  VISIT
                </a>
              </div>
            </Blueprint>
          ))}
        </div>
      </div>

      {/* Free utilities */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Kicker>Free utilities</Kicker>
          <div className="text-sm text-neutral-600">
            No signup, no email capture. Use them and go.
          </div>
        </div>
        <Blueprint className="grid gap-px bg-divider sm:grid-cols-2">
          {UTILITIES.map((u) => (
            <Link
              key={u.title}
              href={u.href}
              className="flex flex-col gap-2.5 bg-ground px-7 py-7 transition-colors hover:bg-surface"
            >
              <div className="text-base font-medium">{u.title}</div>
              <p className="text-sm leading-[1.7] text-neutral-700">{u.body}</p>
              <div className="mt-1 font-heading text-[10.5px] tracking-wordmark text-steel-700">
                OPEN
              </div>
            </Link>
          ))}
        </Blueprint>
      </div>

      {/* Open source */}
      <div className="flex flex-col gap-8">
        <Kicker>Open source</Kicker>
        <Blueprint className="flex flex-wrap items-center justify-between gap-10 bg-surface p-10">
          <p className="max-w-xl font-heading text-2xl font-semibold leading-normal">
            Our public repositories are the fastest way to check our work
            before you talk to us. Read the code, read the commits, then book
            the call.
          </p>
          <a
            href="https://github.com/wbaxterh"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-steel-300 pb-1 text-[15px] text-steel-700 transition-colors hover:border-steel-700"
          >
            View on GitHub
          </a>
        </Blueprint>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {REPOS.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 border border-divider p-6 transition-colors hover:bg-surface"
            >
              <div className="font-heading text-lg transition-colors group-hover:text-steel-700">
                {r.name}
              </div>
              <p className="text-[13.5px] leading-[1.65] text-neutral-700">
                {r.body}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
