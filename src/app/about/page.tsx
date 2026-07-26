import { Metadata } from "next";
import { Blueprint, Kicker } from "@/components/brand/datum";

export const metadata: Metadata = {
  title: "About | A Family Shop With an Enterprise Habit",
  description:
    "Huber Software is Wes, Kat and Tripp Huber: engineering, brand and sales as one accountable team in Winston-Salem, North Carolina. Here is how an engagement runs.",
  alternates: { canonical: "/about" },
};

const PROCESS = [
  {
    n: "01",
    title: "Scope in a week",
    body: "A written architecture, a build order and a number. Yours to keep whether or not you hire us.",
  },
  {
    n: "02",
    title: "Build in the open",
    body: "Two week increments, a live staging URL from week one, and a standing call so nothing is a surprise.",
  },
  {
    n: "03",
    title: "Launch properly",
    body: "Production infrastructure, monitoring, and Kat on the brand and the announcement if you want it.",
  },
  {
    n: "04",
    title: "Stay or hand off",
    body: "We keep maintaining it, or we document it and train your team. Both are fine. Hostage taking is not a business model.",
  },
];

const TEAM = [
  {
    name: "Wes Huber",
    role: "FOUNDER, SOFTWARE AND AI",
    body: "Software engineer, product manager and AI engineer. Ten years of production work across web, mobile and blockchain. Rated five stars by clients on every platform engagement.",
    photoLabel: "PHOTO OF WES",
    links: [
      { label: "GitHub", href: "https://github.com/wbaxterh" },
      {
        label: "Upwork",
        href: "https://www.upwork.com/freelancers/~01387050d017e0878f",
      },
    ],
  },
  {
    name: "Kathleen Huber",
    role: "BRAND AND MARKETING",
    body: "Positioning, brand systems and go to market. Kat writes the words your customers read and builds the campaigns that get them there.",
    photoLabel: "PHOTO OF KAT",
    links: [],
  },
  {
    name: "Tripp Huber",
    role: "PARTNERSHIPS AND SALES",
    body: "Channel partnerships, reseller relationships and direct sales. Tripp is why several of our builds had customers waiting on day one.",
    photoLabel: "PHOTO OF TRIPP",
    links: [],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-5 py-20 md:gap-[88px] md:px-10 md:py-24">
      {/* Intro */}
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-[72px]">
        <div className="flex flex-col gap-6">
          <Kicker className="tracking-label">About</Kicker>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] md:text-6xl">
            A family shop with an enterprise habit.
          </h1>
        </div>
        <div className="flex flex-col gap-5 text-[17px] leading-[1.75] text-neutral-700 lg:pt-12">
          <p>
            Huber Software started because Wes kept getting hired to rescue
            software that had been built to demo, not to run. Somebody had
            shipped a pretty front end with no tests, no pipeline and no plan
            for the second thousand users. Fixing that costs more than doing
            it properly the first time.
          </p>
          <p>
            So we work the way a real product team works. Architecture first,
            then the build, then the deploy pipeline, then the brand and the
            launch. We use AI heavily in how we build, which is why a team of
            three can move at the pace of a much larger one, but the
            discipline underneath is ordinary enterprise practice. Reviewed
            code, versioned infrastructure, monitoring, documentation you can
            hand to the next person.
          </p>
          <p>
            We are small on purpose. You talk to the people doing the work,
            every time.
          </p>
        </div>
      </div>

      {/* Process */}
      <div className="flex flex-col gap-8">
        <Kicker>How an engagement runs</Kicker>
        <Blueprint className="grid gap-px bg-divider sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step) => (
            <div key={step.n} className="flex flex-col gap-3 bg-ground px-7 py-8">
              <div className="font-heading text-[10.5px] font-semibold tracking-kicker text-steel-700">
                {step.n}
              </div>
              <div className="font-heading text-[22px]">{step.title}</div>
              <p className="text-[14.5px] leading-[1.7] text-neutral-700">
                {step.body}
              </p>
            </div>
          ))}
        </Blueprint>
      </div>

      {/* Team */}
      <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((m) => (
          <div key={m.name} className="flex flex-col gap-4">
            <Blueprint className="hatch flex aspect-[4/5] items-end p-4">
              <span className="font-heading text-[10px] tracking-wordmark text-neutral-600">
                {m.photoLabel}
              </span>
            </Blueprint>
            <div className="flex flex-col gap-1.5">
              <div className="font-heading text-2xl">{m.name}</div>
              <div className="font-heading text-[10px] font-semibold tracking-kicker text-steel-700">
                {m.role}
              </div>
              <p className="mt-1.5 text-[14.5px] leading-[1.7] text-neutral-700">
                {m.body}
              </p>
              {m.links.length > 0 && (
                <div className="mt-2 flex gap-4">
                  {m.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13.5px] text-steel-700 underline underline-offset-4 hover:text-steel-800"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
