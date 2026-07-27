import { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const LAST_MODIFIED = new Date("2026-07-26");

const ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/work", priority: 0.9 },
  { path: "/work/bluegrass-damage-appraisal", priority: 0.8 },
  { path: "/work/helio", priority: 0.7 },
  { path: "/work/trick-book", priority: 0.7 },
  { path: "/work/ai-support-platform", priority: 0.8 },
  { path: "/about", priority: 0.8 },
  { path: "/tools", priority: 0.7 },
  { path: "/tools/pdf-merger", priority: 0.5 },
  { path: "/nda-sign", priority: 0.4 },
  { path: "/contact", priority: 0.9 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${SITE.url}${r.path === "/" ? "" : r.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
