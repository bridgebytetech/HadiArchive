import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = [
    "",
    "/about",
    "/videos",
    "/photos",
    "/audios",
    "/speeches",
    "/writings",
    "/poems",
    "/quotes",
    "/timeline",
    "/events",
    "/locations",
    "/tributes",
    "/documents",
    "/social-posts",
    "/requests",
    "/contact"
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}