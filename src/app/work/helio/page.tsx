import { Metadata } from "next";
import Image from "next/image";
import { Blueprint, Kicker, PrimaryCta, Tag } from "@/components/brand/datum";
import { JsonLd, breadcrumbs } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Helio Case Study | AI Machine Monitoring, Our Own Product",
  description:
    "Helio is our industrial IoT product: AI powered machine monitoring for American manufacturers. Hardware in the plant, intelligence on top, unplanned downtime caught before it costs a shift.",
  alternates: { canonical: "/work/helio" },
};

const FACTS = [
  ["ROLE", "Founders and builders"],
  ["DOMAIN", "Industrial IoT"],
  ["BUYERS", "American manufacturers"],
  ["STATUS", "Live, beta program open"],
];

const STACK = ["IOT SENSORS", "AWS IOT", "AI MODELS", "REAL TIME DATA"];

export default function HelioCaseStudy() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-5 py-20 md:px-10 md:py-24">
      <JsonLd
        data={breadcrumbs([
          { name: "Work", path: "/work" },
          { name: "Helio", path: "/work/helio" },
        ])}
      />
      <div className="flex flex-col gap-6">
        <Kicker className="tracking-label">Case study / Our product</Kicker>
        <h1 className="font-heading text-5xl font-semibold leading-[1.05] md:text-6xl">
          Helio makes machines make sense.
        </h1>
        <p className="max-w-2xl text-lg leading-[1.7] text-neutral-700">
          Helio is our industrial IoT product: AI powered machine monitoring
          for American manufacturers. Sensors on the equipment, intelligence
          on top, and answers a plant manager can act on before a failure
          costs a shift.
        </p>
      </div>

      <Blueprint className="relative aspect-[16/10]">
        <Image
          src="/work/helio.webp"
          alt="helioiot.com homepage: Helio makes machines make sense"
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover object-top"
          priority
        />
      </Blueprint>

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
            Machine downtime is the most expensive silence in manufacturing.
            Helio puts monitoring on the equipment and AI over the data to
            extend machine life, cut unplanned downtime, and catch failures
            while they are still maintenance instead of emergencies. It is
            live at helioiot.com with a beta program open for manufacturers.
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
            Helio is the hardest kind of product to ship: physical hardware,
            real time data pipelines, AI that has to be right, and buyers who
            do not forgive flaky software. Building and operating it ourselves
            is the reason we can walk into an IoT or AI engagement already
            knowing where the bodies are buried.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-divider pt-10">
        <a
          href="https://helioiot.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] text-steel-700 underline underline-offset-4 hover:text-steel-800"
        >
          Visit helioiot.com
        </a>
        <PrimaryCta href="/contact" className="ml-auto">
          Book a call
        </PrimaryCta>
      </div>
    </div>
  );
}
