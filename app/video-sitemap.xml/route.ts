import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://hadiarchive.com";
  
  const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${base}/videos/last-speech</loc>
    <video:video>
      <video:thumbnail_loc>${base}/images/video-thumb-last-speech.jpg</video:thumbnail_loc>
      <video:title>Osman Hadi's Last Public Speech</video:title>
      <video:description>Final public address by Shaheed Osman Hadi before his martyrdom</video:description>
      <video:content_loc>${base}/videos/osman-hadi-last-speech.mp4</video:content_loc>
      <video:player_loc>${base}/player?video=last-speech</video:player_loc>
      <video:duration>1200</video:duration>
      <video:publication_date>2025-12-10</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:tag>Osman Hadi</video:tag>
      <video:tag>July Revolution</video:tag>
      <video:tag>Bangladesh</video:tag>
      <video:category>Politics</video:category>
      <video:uploader info="${base}/about">Osman Hadi Foundation</video:uploader>
    </video:video>
  </url>
  <url>
    <loc>${base}/videos/july-revolution</loc>
    <video:video>
      <video:thumbnail_loc>${base}/images/video-thumb-july.jpg</video:thumbnail_loc>
      <video:title>Osman Hadi Leading July Revolution Protests</video:title>
      <video:description>Historical footage of Osman Hadi during July 2024 protests</video:description>
      <video:content_loc>${base}/videos/july-revolution-osman-hadi.mp4</video:content_loc>
      <video:duration>2400</video:duration>
      <video:publication_date>2024-07-15</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:tag>July Revolution</video:tag>
      <video:tag>Student Movement</video:tag>
      <video:category>Documentary</video:category>
    </video:video>
  </url>
</urlset>`;

  return new NextResponse(videoSitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
