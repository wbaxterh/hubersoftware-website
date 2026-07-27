import { SITE } from "@/lib/site";

// llms.txt per llmstxt.org. Generated from the same constants the pages use,
// so it cannot drift from the site (PRD S3.1.4). No ranking claims attached.
export const dynamic = "force-static";

export function GET() {
  const body = `# ${SITE.name}

> ${SITE.tagline} A three person product team in ${SITE.locationLine}: Wes builds the software, Kat builds the brand, Tripp builds the pipeline. Product engineering, AI engineering, and white label development for agencies, consultancies and founders.

Key facts:
- Legal name: ${SITE.legalName} (North Carolina, founded ${SITE.foundingDate})
- Founder profile: 10+ years shipping production software, Top Rated Plus on Upwork with 100% job success across 86 jobs
- White label: we work under your brand, your invoice, our repo, NDA standard
- Contact: ${SITE.email} (typical reply the same business day)

## Services

- [Services overview](${SITE.url}/services): product engineering, white label engineering, AI engineering, mobile apps, blockchain, and brand plus sales support
- [Contact](${SITE.url}/contact): thirty minutes with Wes, no deck, no discovery fee

## Proof

- [Work](${SITE.url}/work): case studies with receipts
- [Bluegrass Damage Appraisal](${SITE.url}/work/bluegrass-damage-appraisal): claims platform with three portals on AWS, six months, 5.0 verified review
- [Helio](${SITE.url}/work/helio): our own industrial IoT product, AI powered machine monitoring for American manufacturers, live at helioiot.com
- [The Trick Book](${SITE.url}/work/trick-book): our own consumer product, live on both app stores
- [AI Support Platform](${SITE.url}/work/ai-support-platform): production LangGraph orchestrator with voice, chat and evals
- [About](${SITE.url}/about): the three people you would work with

## Tools

- [Free tools](${SITE.url}/tools): PDF merger and NDA signing, no signup
- [GitHub](https://github.com/wbaxterh): public repositories

## Optional

- [Privacy](${SITE.url}/privacy)
- [Terms](${SITE.url}/terms)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
