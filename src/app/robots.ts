import { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Explicit allows for AI crawlers (PRD S3.1.3): self-documenting, and they
// survive future default-deny edits. Blocking Google-Extended would not
// affect AI Overviews, but there is no reason to block anything here.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "CCBot",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
