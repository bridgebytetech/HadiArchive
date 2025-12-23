import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://hadiarchive.com";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME_EN || "Shaheed Osman Hadi Memorial";
  
  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>${base}/news/martyrdom-december-18</loc>
    <news:news>
      <news:publication>
        <news:name>${siteName}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2025-12-18</news:publication_date>
      <news:title>Shaheed Sharif Osman Bin Hadi Martyred at Singapore Hospital</news:title>
      <news:keywords>Osman Hadi, Martyrdom, July Revolution, Bangladesh</news:keywords>
    </news:news>
  </url>
  <url>
    <loc>${base}/news/july-revolution-leader</loc>
    <news:news>
      <news:publication>
        <news:name>${siteName}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2024-07-15</news:publication_date>
      <news:title>Osman Hadi Emerges as July Revolution Leader</news:title>
      <news:keywords>July Revolution, Inqilab Moncho, Student Movement</news:keywords>
    </news:news>
  </url>
  <url>
    <loc>${base}/bn/news/shaheed-osman-hadi</loc>
    <news:news>
      <news:publication>
        <news:name>শহীদ ওসমান হাদির স্মৃতি সংগ্রহশালা</news:name>
        <news:language>bn</news:language>
      </news:publication>
      <news:publication_date>2025-12-18</news:publication_date>
      <news:title>শহীদ শরীফ ওসমান বিন হাদি সিঙ্গাপুর হাসপাতালে শাহাদত বরণ</news:title>
      <news:keywords>ওসমান হাদি, শাহাদত, জুলাই বিপ্লব, বাংলাদেশ</news:keywords>
    </news:news>
  </url>
</urlset>`;

  return new NextResponse(newsSitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
