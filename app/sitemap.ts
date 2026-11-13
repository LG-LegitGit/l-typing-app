import type { MetadataRoute } from "next";
import { SITE, GUIDES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...GUIDES.map((g) => ({
      url: `${SITE.url}/guides/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
}
