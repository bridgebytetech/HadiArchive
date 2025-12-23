import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://hadiarchive.com";
  
  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${base}</loc>
    <image:image>
      <image:loc>${base}/images/osman-hadi-portrait.jpg</image:loc>
      <image:title>Shaheed Sharif Osman Bin Hadi Official Portrait</image:title>
      <image:caption>Official portrait of Shaheed Sharif Osman Bin Hadi (1993-2025)</image:caption>
      <image:geo_location>Dhaka, Bangladesh</image:geo_location>
      <image:license>${base}/copyright</image:license>
    </image:image>
  </url>
  <url>
    <loc>${base}/july-revolution</loc>
    <image:image>
      <image:loc>${base}/images/july-revolution-hero.jpg</image:loc>
      <image:title>Osman Hadi at July Revolution 2024</image:title>
      <image:caption>Osman Hadi speaking at July Revolution protest in Dhaka</image:caption>
      <image:geo_location>Dhaka, Bangladesh</image:geo_location>
    </image:image>
  </url>
  <url>
    <loc>${base}/martyrdom</loc>
    <image:image>
      <image:loc>${base}/images/funeral-jatiya-sangsad.jpg</image:loc>
      <image:title>Funeral Prayer at Jatiya Sangsad Bhaban</image:title>
      <image:caption>Thousands attend funeral prayer of Shaheed Osman Hadi</image:caption>
      <image:geo_location>Dhaka, Bangladesh</image:geo_location>
    </image:image>
  </url>
</urlset>`;

  return new NextResponse(imageSitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
