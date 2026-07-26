import { Metadata } from "next";
import { Blueprint, Kicker, PrimaryCta, Tag } from "@/components/brand/datum";
import { JsonLd, breadcrumbs } from "@/components/seo/json-ld";
import { UPWORK_PROFILE_URL } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Bluegrass Damage Appraisal Case Study | Claims Platform on AWS",
  description:
    "How a three portal claims management platform went from empty repo to production on AWS in six months: one backend API, portals for appraisers, adjusters and clients, and CI/CD that ships fixes the same day.",
  alternates: { canonical: "/work/bluegrass-damage-appraisal" },
};

const FACTS = [
  ["ENGAGEMENT", "Six months, fixed price"],
  ["SHAPE", "One API, three portals"],
  ["INFRASTRUCTURE", "AWS with CI/CD pipelines"],
  ["REVIEW", "5.0 on Upwork, verified"],
];

const STACK = ["NEXT.JS", "NODE", "AWS", "CI/CD", "WEWEB", "XANO"];

export default function BluegrassCaseStudy() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-5 py-20 md:px-10 md:py-24">
      <JsonLd
        data={breadcrumbs([
          { name: "Work", path: "/work" },
          { name: "Bluegrass Damage Appraisal", path: "/work/bluegrass-damage-appraisal" },
        ])}
      />
      {/* Header */}
      <div className="flex flex-col gap-6">
        <Kicker className="tracking-label">Case study / Client platform</Kicker>
        <h1 className="font-heading text-5xl font-semibold leading-[1.05] md:text-6xl">
          A claims platform with three portals, live in six months.
        </h1>
        <p className="max-w-2xl text-lg leading-[1.7] text-neutral-700">
          Bluegrass Damage Appraisal runs vehicle damage claims across
          appraisers, adjusters and end clients. They needed one system where
          three very different kinds of users could do their jobs without
          emailing spreadsheets at each other.
        </p>
      </div>

      {/* Facts strip */}
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

      {/* Narrative */}
      <div className="flex flex-col gap-10 text-[16px] leading-[1.75] text-neutral-700">
        <div>
          <h2 className="mb-3 font-heading text-3xl font-semibold text-ink">
            The opportunity
          </h2>
          <p>
            Claims work is coordination work. An appraiser inspects, an
            adjuster decides, a client waits for news, and every handoff
            between them is a place information goes to die. The business had
            outgrown the tools it started with, and off the shelf claims
            software either did too much or the wrong things.
          </p>
        </div>
        <div>
          <h2 className="mb-3 font-heading text-3xl font-semibold text-ink">
            The build
          </h2>
          <p className="mb-4">
            We scoped the architecture first: one backend API as the single
            source of truth, and three separate portals shaped around how each
            role actually works. Appraisers get scheduling and inspection
            capture. Adjusters get review queues and decisions. Clients get
            status without phone calls.
          </p>
          <p>
            The unglamorous parts got the same care as the screens. AWS
            infrastructure defined properly, CI/CD pipelines from the first
            month, and a staging environment the client could click through
            while we built. When production issues came up after launch, the
            pipeline let us ship the fix the same day the problem showed up.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {STACK.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-heading text-3xl font-semibold text-ink">
            The impact
          </h2>
          <p>
            Six months from empty repo to a production platform the whole
            operation runs on, delivered on a fixed price. The engagement is
            public on Upwork with a 5.0 rating and a completed contract, so
            you do not have to take our word for any of this.
          </p>
        </div>
      </div>

      {/* The review, verbatim */}
      <Blueprint className="flex flex-col gap-6 bg-neutral-100 p-8 md:p-10">
        <Kicker>The client review, verbatim</Kicker>
        <blockquote className="font-heading text-2xl font-semibold leading-normal">
          &ldquo;Wes built out a substantial full-stack platform over a
          six-month engagement, including backend API, three user portals, AWS
          infrastructure, and CI/CD pipelines. He was responsive to feedback
          and willing to put in long hours when production issues came up.
          Communication was generally clear throughout the project.&rdquo;
        </blockquote>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium">Cody Underwood</div>
            <div className="mt-1 text-[13px] text-neutral-600">
              Bluegrass Damage Appraisal
            </div>
          </div>
          <a
            href={UPWORK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13.5px] text-steel-700 underline underline-offset-4 hover:text-steel-800"
          >
            Verified on Upwork, 5.0
          </a>
        </div>
      </Blueprint>

      {/* CTA */}
      <div className="flex flex-wrap items-center justify-between gap-8 border-t border-divider pt-10">
        <p className="max-w-md text-base leading-[1.7] text-neutral-700">
          Have a platform like this in your head, or a build like this going
          sideways? Thirty minutes with Wes gets you a straight answer.
        </p>
        <PrimaryCta href="/contact">Book a call</PrimaryCta>
      </div>
    </div>
  );
}
