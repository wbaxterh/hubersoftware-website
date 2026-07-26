import { Metadata } from "next";
import { Blueprint, Kicker, PrimaryCta, Tag } from "@/components/brand/datum";
import { JsonLd, breadcrumbs } from "@/components/seo/json-ld";
import { UPWORK_PROFILE_URL } from "@/lib/stats";

export const metadata: Metadata = {
  title: "AI Support Platform Case Study | Production LangGraph Orchestrator",
  description:
    "A retrieval augmented support agent in production for a consumer software company: voice and live chat channels, secure account operations over MCP, Langfuse observability and eval harnesses.",
  alternates: { canonical: "/work/ai-support-platform" },
};

const FACTS = [
  ["CLIENT", "TechInnovators"],
  ["CHANNELS", "Voice and live chat"],
  ["SAFETY", "Compliance gated flows"],
  ["QUALITY", "Eval harnesses in CI"],
];

const STACK = [
  "LANGGRAPH",
  "TYPESCRIPT",
  "QDRANT",
  "MCP",
  "LANGFUSE",
  "VUE 3",
  "FASTIFY",
];

export default function AiPlatformCaseStudy() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-5 py-20 md:px-10 md:py-24">
      <JsonLd
        data={breadcrumbs([
          { name: "Work", path: "/work" },
          { name: "AI Support Platform", path: "/work/ai-support-platform" },
        ])}
      />
      <div className="flex flex-col gap-6">
        <Kicker className="tracking-label">Case study / Client platform</Kicker>
        <h1 className="font-heading text-5xl font-semibold leading-[1.05] md:text-6xl">
          An AI support agent that survives production.
        </h1>
        <p className="max-w-2xl text-lg leading-[1.7] text-neutral-700">
          A consumer software company needed their legacy chat bots replaced
          with something that could actually resolve support conversations,
          on the phone and in chat, without inventing answers or leaking
          account data.
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
            The build
          </h2>
          <p className="mb-4">
            A production LangGraph orchestrator in TypeScript replaced the
            legacy agents: a retrieval augmented support agent with hybrid
            vector search over the company&apos;s docs, a compliance gated
            sales flow, and dedicated state machines for retention and spam
            routing. The same platform serves voice through a websocket
            adapter and live chat in the browser.
          </p>
          <p>
            Account operations are the part most teams get wrong. Lookups,
            verification codes, orders and cancellations run through an MCP
            server over JSON-RPC, so the model never touches credentials and
            every action is auditable.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {STACK.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-heading text-3xl font-semibold text-ink">
            The discipline
          </h2>
          <p>
            Langfuse observability on every conversation, eval harnesses that
            catch quality slips before customers do, and a CI ingestion
            pipeline that keeps the knowledge base current as docs change.
            AI features are software. They deserve the same engineering as
            the rest of the system.
          </p>
        </div>
      </div>

      <Blueprint className="flex flex-col gap-6 bg-neutral-100 p-8 md:p-10">
        <Kicker>The client review, verbatim</Kicker>
        <blockquote className="font-heading text-2xl font-semibold leading-normal">
          &ldquo;Wes is a highly engaged and sharp developer who proactively
          analyzes systems and naturally looks for optimizations.&rdquo;
        </blockquote>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium">Armando Farr</div>
            <div className="mt-1 text-[13px] text-neutral-600">TechInnovators</div>
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

      <div className="flex flex-wrap items-center justify-between gap-8 border-t border-divider pt-10">
        <p className="max-w-md text-base leading-[1.7] text-neutral-700">
          Want AI features that hold up after the demo? That is the exact
          thing we build.
        </p>
        <PrimaryCta href="/contact">Book a call</PrimaryCta>
      </div>
    </div>
  );
}
