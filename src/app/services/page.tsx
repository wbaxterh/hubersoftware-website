import { Metadata } from "next";
import Link from "next/link";
import { Blueprint, Kicker, PrimaryCta, Tag } from "@/components/brand/datum";
import { JsonLd, breadcrumbs } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Services | Everything a Product Needs, From One Team",
  description:
    "Product engineering, white label engineering for agencies, AI engineering, mobile apps, blockchain, and the brand and sales work no dev shop offers. Three ways to engage: scope sprint, fixed scope build, or retainer.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    n: "01",
    id: "product-engineering",
    title: "Product engineering",
    body: "Full stack web platforms with a real backend, a real database and a real deploy pipeline. Vue, React, Node, Fastify, Python, Postgres, AWS. The claims platform we built for Bluegrass had three portals and one API behind them, and it went to production in six months.",
    tags: ["ARCHITECTURE", "API DESIGN", "AWS", "CI/CD"],
    proof: { label: "See the Bluegrass build", href: "/work/bluegrass-damage-appraisal" },
  },
  {
    n: "02",
    id: "white-label",
    title: "White label engineering",
    body: "We become your engineering department under your brand. Your client relationship, your name on the invoice, our team in the repo. Agencies use us when they have sold more than they can staff, and consultancies use us when a project needs a level of technical depth they do not keep in house. Nobody outside your company ever needs to know.",
    tags: ["YOUR BRAND", "NDA STANDARD", "SENIOR ONLY"],
    proof: null,
  },
  {
    n: "03",
    id: "ai-engineering",
    title: "AI engineering",
    body: "Model backed features that hold up in production: retrieval over your own data, agents that touch real systems, evaluation so you know when quality slips. We also use AI in our own build process, which is a large part of why our timelines look the way they do.",
    tags: ["RAG", "AGENTS", "EVALS", "MCP"],
    proof: { label: "See the AI support platform", href: "/work/ai-support-platform" },
  },
  {
    n: "04",
    id: "mobile-apps",
    title: "Mobile apps",
    body: "iOS and Android, native or cross platform depending on what the product actually needs. We have shipped our own apps through both stores, so we know where the review process bites.",
    tags: ["REACT NATIVE", "APP STORE", "GOOGLE PLAY"],
    proof: { label: "See The Trick Book", href: "/work/trick-book" },
  },
  {
    n: "05",
    id: "blockchain",
    title: "Blockchain and web3",
    body: "Smart contracts, wallet flows and the boring parts nobody talks about, like key handling and indexing. We treat contract code the way it deserves to be treated, with tests and a review before anything touches mainnet.",
    tags: ["SMART CONTRACTS", "WALLETS", "INDEXING"],
    proof: null,
  },
  {
    n: "06",
    id: "brand-marketing",
    title: "Brand, marketing and sales",
    body: "The part almost no development shop offers. Kat builds the brand and the launch, Tripp builds the pipeline and the partnerships. If you are a founder without a marketing hire yet, this is the difference between a live product and a product with users.",
    tags: ["POSITIONING", "LAUNCH", "PARTNERSHIPS"],
    proof: null,
  },
];

const MODELS = [
  {
    kicker: "SCOPE SPRINT",
    title: "One week, fixed fee",
    body: "An architecture document, a build plan and a real number. Credited back if you continue with us.",
  },
  {
    kicker: "BUILD",
    title: "Fixed scope project",
    body: "A defined release with a defined price and date. Two week increments, staging URL from the first one.",
  },
  {
    kicker: "RETAINER",
    title: "Your product team",
    body: "Monthly, ongoing. Engineering, brand and sales support as one team. Cancel with thirty days notice.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <JsonLd data={breadcrumbs([{ name: "Services", path: "/services" }])} />
      {/* Intro */}
      <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-5 pb-16 pt-20 md:px-10 md:pt-24 lg:grid-cols-2 lg:gap-[72px]">
        <div className="flex flex-col gap-6">
          <Kicker className="tracking-label">Services</Kicker>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] md:text-6xl">
            Everything a product needs, from one team.
          </h1>
        </div>
        <p className="text-[17px] leading-[1.75] text-neutral-700 lg:pt-12">
          Hire us for one piece or the whole thing. Most clients start with a
          scope, then keep us on retainer once the first release is out. We
          also work quietly behind other agencies as their engineering team,
          and nobody outside your company ever needs to know.
        </p>
      </div>

      {/* Services list */}
      <div className="mx-auto w-full max-w-6xl px-5 pb-20 md:px-10 md:pb-24">
        <div className="border-t border-divider">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="grid scroll-mt-24 items-start gap-4 border-b border-divider py-9 md:grid-cols-[46px_230px_1fr] md:gap-9"
            >
              <div className="pt-1.5 font-heading text-[11px] text-neutral-600">
                {s.n}
              </div>
              <h2 className="font-heading text-[27px] leading-tight">{s.title}</h2>
              <div className="flex flex-col gap-3.5">
                <p className="text-[15.5px] leading-[1.75] text-neutral-700">
                  {s.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                {s.proof && (
                  <Link
                    href={s.proof.href}
                    className="text-[14px] text-steel-700 underline underline-offset-4 hover:text-steel-800"
                  >
                    {s.proof.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement models */}
      <div className="bg-steel-900 text-ground">
        <div className="mx-auto flex max-w-6xl flex-col gap-11 px-5 py-20 md:px-10 md:py-[88px]">
          <h2 className="font-heading text-3xl font-semibold leading-tight md:text-[38px]">
            Three ways to work with us.
          </h2>
          <Blueprint light className="grid gap-px border-ground/20 bg-ground/20 md:grid-cols-3">
            {MODELS.map((m) => (
              <div key={m.kicker} className="flex flex-col gap-3 bg-steel-900 px-7 py-8">
                <div className="font-heading text-[10.5px] font-semibold tracking-kicker text-steel-400">
                  {m.kicker}
                </div>
                <div className="font-heading text-[26px] font-semibold">{m.title}</div>
                <p className="text-[14.5px] leading-[1.7] text-neutral-400">{m.body}</p>
              </div>
            ))}
          </Blueprint>
          <PrimaryCta href="/contact" className="self-start">
            Book a call
          </PrimaryCta>
        </div>
      </div>
    </div>
  );
}
