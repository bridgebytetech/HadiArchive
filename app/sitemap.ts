import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://hadiarchive.com";
  
  const paths = [
    "",
    "/about",
    "/biography",
    "/videos",
    "/photos",
    "/audios",
    "/speeches",
    "/writings",
    "/poems",
    "/quotes",
    "/timeline",
    "/events",
    "/july-revolution",
    "/inqilab-moncho",
    "/locations",
    "/tributes",
    "/documents",
    "/press",
    "/news",
    "/contact"
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
