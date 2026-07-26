import { Metadata } from "next";
import { Blueprint, Kicker, PrimaryCta, Tag } from "@/components/brand/datum";
import { JsonLd, breadcrumbs } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "The Trick Book Case Study | Our Own Product, End to End",
  description:
    "The Trick Book is our proof that we ship whole products: React Native apps on both stores, a Next.js web app, an Express backend on AWS, a 3,800+ spot map, and AI companions with persistent memory.",
  alternates: { canonical: "/work/trick-book" },
};

const FACTS = [
  ["ROLE", "Founder, designer, engineer"],
  ["DISTRIBUTION", "App Store and Google Play"],
  ["SCALE", "3,800+ mapped spots"],
  ["MODEL", "Freemium with Stripe"],
];

const STACK = [
  "REACT NATIVE",
  "NEXT.JS",
  "EXPRESS",
  "MONGODB",
  "AWS",
  "STRIPE",
];

export default function TrickBookCaseStudy() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-5 py-20 md:px-10 md:py-24">
      <JsonLd
        data={breadcrumbs([
          { name: "Work", path: "/work" },
          { name: "The Trick Book", path: "/work/trick-book" },
        ])}
      />
      <div className="flex flex-col gap-6">
        <Kicker className="tracking-label">Case study / Our product</Kicker>
        <h1 className="font-heading text-5xl font-semibold leading-[1.05] md:text-6xl">
          The product we run ourselves.
        </h1>
        <p className="max-w-2xl text-lg leading-[1.7] text-neutral-700">
          The Trick Book is a trick progression platform for skateboarders,
          snowboarders, BMX riders and surfers. We built it, we operate it, we
          market it. Every architecture call we recommend to clients is one we
          already live with here.
        </p>
      </div>

      <Blueprint className="grid gap-px bg-divider sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1.5 bg-ground px-6 py-5">
            <div className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-600">
              {k}
            </div>
            <div className="text-[14.5px] font-medium">{v}</div>
          </div>
        ))}
      </Blueprint>

      <div className="flex flex-col gap-10 text-[16px] leading-[1.75] text-neutral-700">
        <div>
          <h2 className="mb-3 font-heading text-3xl font-semibold text-ink">
            What it is
          </h2>
          <p>
            A structured trick encyclopedia, progression tracking, a GPS spot
            map with more than 3,800 locations, real time messaging, media
            feeds with CDN streaming, and freemium subscriptions through
            Stripe. Live on the App Store and Google Play as a React Native
            app, with a Next.js web app and an Express plus MongoDB backend
            on AWS.
          </p>
        </div>
        <div>
          <h2 className="mb-3 font-heading text-3xl font-semibold text-ink">
            The AI part
          </h2>
          <p>
            The flagship feature is companions: LLM powered characters with
            nine function calling tools, persistent relationship memory, and
            awareness of each rider&apos;s progression. The next release puts
            them on an interactive 3D stage where they physically demonstrate
            tricks with orbitable cameras and slow motion playback.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {STACK.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-heading text-3xl font-semibold text-ink">
            Why it matters to your project
          </h2>
          <p>
            A dev shop that has never operated its own product learns your
            hard lessons on your budget. We have shipped through both app
            review processes, run production infrastructure under real
            traffic, and marketed a consumer product with our own money. That
            experience is in the room on every client engagement.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-divider pt-10">
        <a
          href="https://thetrickbook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] text-steel-700 underline underline-offset-4 hover:text-steel-800"
        >
          Visit thetrickbook.com
        </a>
        <PrimaryCta href="/contact" className="ml-auto">
          Book a call
        </PrimaryCta>
      </div>
    </div>
  );
}
