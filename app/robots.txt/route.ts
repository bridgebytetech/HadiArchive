// app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hadiarchive.com";
  
  const robotsTxt = `# =====================================
# Shaheed Osman Hadi Memorial Archive
# Official Digital Repository
# ${base}
# =====================================

# Default Rules for All Bots
User-agent: *
Allow: /
Disallow: /api/private/
Disallow: /admin/
Disallow: /_next/static/
Disallow: /private/
Disallow: /*.json$
Disallow: /tmp/
Disallow: /cache/
Disallow: /*?preview=true
Disallow: /*?draft=true
Crawl-delay: 1

# =====================================
# WIKIPEDIA & WIKIMEDIA BOTS
# Full unrestricted access for Wikipedia
# =====================================

User-agent: WikipediaBot
Allow: /
Crawl-delay: 0

User-agent: MediaWiki
Allow: /

User-agent: Wikimedia
Allow: /

# =====================================
# SEARCH ENGINE BOTS
# =====================================

# Google - Full Access
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Googlebot-Image
Allow: /
Allow: /images/
Allow: /gallery/

User-agent: Googlebot-News
Allow: /
Allow: /news/
Allow: /press/

User-agent: AdsBot-Google
Allow: /

User-agent: Mediapartners-Google
Allow: /

# Bing/Microsoft
User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: msnbot
Allow: /
Crawl-delay: 1

# =====================================
# ARCHIVAL & PRESERVATION BOTS
# Critical for historical documentation
# =====================================

User-agent: ia_archiver
Allow: /
Crawl-delay: 0

User-agent: Wayback Machine
Allow: /

User-agent: Archive.org_bot
Allow: /

# =====================================
# ACADEMIC & RESEARCH BOTS
# =====================================

User-agent: Scholarly
Allow: /

User-agent: Google-Scholar
Allow: /

User-agent: Semanticbot
Allow: /

User-agent: CiteSeerXbot
Allow: /

User-agent: RefSeek
Allow: /

User-agent: Scirus
Allow: /

# =====================================
# SOCIAL MEDIA BOTS
# =====================================

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: Telegram
Allow: /

User-agent: Slackbot
Allow: /

User-agent: Discordbot
Allow: /

# =====================================
# NEWS & CONTENT AGGREGATORS
# =====================================

User-agent: Applebot
Allow: /
Crawl-delay: 1

User-agent: GoogleOther
Allow: /

User-agent: Flipboard
Allow: /

User-agent: NewsNow
Allow: /

# =====================================
# AI & LLM BOTS
# =====================================

User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: ChatGPT-User
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: Claude-Web
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: Perplexity-bot
Allow: /

# =====================================
# OTHER SEARCH ENGINES
# =====================================

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

User-agent: Yandex
Allow: /
Crawl-delay: 2

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

User-agent: Naver
Allow: /
Crawl-delay: 2

User-agent: Sogou
Allow: /
Crawl-delay: 2

# =====================================
# SEO ANALYSIS TOOLS
# Limited access with crawl delay
# =====================================

User-agent: AhrefsBot
Allow: /
Crawl-delay: 3

User-agent: SemrushBot
Allow: /
Crawl-delay: 3

User-agent: Moz
Allow: /
Crawl-delay: 3

User-agent: Screaming Frog SEO Spider
Allow: /
Crawl-delay: 2

# =====================================
# BLOCKED BOTS
# Known malicious or resource-heavy bots
# =====================================

User-agent: MegaIndex
Disallow: /

User-agent: PetalBot
Disallow: /

User-agent: serpstatbot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: DataForSeoBot
Disallow: /

User-agent: AspiegelBot
Disallow: /

# =====================================
# SITEMAPS
# =====================================

Sitemap: ${base}/sitemap.xml
Sitemap: ${base}/sitemap-index.xml
Sitemap: ${base}/news-sitemap.xml
Sitemap: ${base}/image-sitemap.xml
Sitemap: ${base}/video-sitemap.xml
Sitemap: ${base}/sitemap-bn.xml
Sitemap: ${base}/sitemap-en.xml
Sitemap: ${base}/sitemap-pages.xml
Sitemap: ${base}/sitemap-posts.xml
Sitemap: ${base}/sitemap-categories.xml
Sitemap: ${base}/sitemap-tags.xml

# =====================================
# HOST SPECIFICATION
# =====================================

Host: ${base}

# =====================================
# END OF ROBOTS.TXT
# Last Updated: ${new Date().toISOString()}
# Contact: webmaster@hadiarchive.com
# =====================================`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'all',
    },
  });
}
