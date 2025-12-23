import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hadiarchive.com";
  
  return {
    rules: [
      // Default rule for all bots
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/*.json$",
          "/tmp/",
          "/cache/",
          "/config/",
          "/*?preview=true",
          "/*?draft=true"
        ],
        crawlDelay: 1,
      },
      
      // Wikipedia Bot - Full Access
      {
        userAgent: "WikipediaBot",
        allow: ["/"],
        crawlDelay: 0,
      },
      
      // Wikimedia Bots
      {
        userAgent: "MediaWiki",
        allow: ["/"],
      },
      {
        userAgent: "Wikimedia",
        allow: ["/"],
      },
      
      // Google Bots - Priority Access
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/api/private/", "/admin/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/images/", "/gallery/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-News",
        allow: ["/", "/news/", "/press/", "/updates/"],
      },
      {
        userAgent: "AdsBot-Google",
        allow: ["/"],
      },
      
      // Bing/Microsoft Bots
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: ["/api/private/", "/admin/"],
        crawlDelay: 1,
      },
      {
        userAgent: "msnbot",
        allow: ["/"],
        crawlDelay: 1,
      },
      
      // Archive.org Bot - Historical Preservation
      {
        userAgent: "ia_archiver",
        allow: ["/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Wayback Machine",
        allow: ["/"],
      },
      
      // Academic & Research Bots
      {
        userAgent: "Scholarly",
        allow: ["/"],
      },
      {
        userAgent: "Google-Scholar",
        allow: ["/"],
      },
      {
        userAgent: "Semanticbot",
        allow: ["/"],
      },
      {
        userAgent: "CiteSeerXbot",
        allow: ["/"],
      },
      
      // Social Media Bots
      {
        userAgent: "facebookexternalhit",
        allow: ["/"],
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Twitterbot",
        allow: ["/"],
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "LinkedInBot",
        allow: ["/"],
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "WhatsApp",
        allow: ["/"],
      },
      {
        userAgent: "Slackbot",
        allow: ["/"],
      },
      
      // News Aggregators
      {
        userAgent: "Applebot",
        allow: ["/"],
        crawlDelay: 1,
      },
      {
        userAgent: "GoogleOther",
        allow: ["/"],
      },
      
      // SEO Tools - Allow for monitoring
      {
        userAgent: "AhrefsBot",
        allow: ["/"],
        crawlDelay: 2,
      },
      {
        userAgent: "SemrushBot",
        allow: ["/"],
        crawlDelay: 2,
      },
      {
        userAgent: "MJ12bot",
        allow: ["/"],
        crawlDelay: 5,
      },
      {
        userAgent: "DotBot",
        allow: ["/"],
        crawlDelay: 2,
      },
      
      // Yandex (Russian Search Engine)
      {
        userAgent: "Yandex",
        allow: ["/"],
        crawlDelay: 2,
      },
      
      // Baidu (Chinese Search Engine)
      {
        userAgent: "Baiduspider",
        allow: ["/"],
        crawlDelay: 2,
      },
      
      // DuckDuckGo
      {
        userAgent: "DuckDuckBot",
        allow: ["/"],
        crawlDelay: 1,
      },
      
      // OpenAI GPT Bot
      {
        userAgent: "GPTBot",
        allow: ["/"],
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/"],
        disallow: ["/api/", "/admin/", "/private/"],
      },
      
      // Claude/Anthropic
      {
        userAgent: "Claude-Web",
        allow: ["/"],
        disallow: ["/api/", "/admin/", "/private/"],
      },
      
      // Prevent Bad Bots
      {
        userAgent: "SiteCheckerBotCrawler",
        disallow: ["/"],
      },
      {
        userAgent: "MegaIndex",
        disallow: ["/"],
      },
      {
        userAgent: "PetalBot",
        disallow: ["/"],
      },
      {
        userAgent: "serpstatbot",
        disallow: ["/"],
      },
      {
        userAgent: "Bytespider",
        disallow: ["/"],
      },
    ],
    
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/sitemap-index.xml`,
      `${base}/news-sitemap.xml`,
      `${base}/image-sitemap.xml`,
      `${base}/video-sitemap.xml`,
      `${base}/sitemap-bn.xml`, // Bengali content sitemap
      `${base}/sitemap-en.xml`, // English content sitemap
    ],
    
    host: base,
  };
}
