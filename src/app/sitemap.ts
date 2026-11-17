import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/restaurant", "/features", "/privacy", "/terms", "/support"];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-11-17"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
