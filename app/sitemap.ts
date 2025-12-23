import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://hadiarchive.com";
  const currentDate = new Date().toISOString();
  
  // Core pages with highest priority
  const coreSitemap: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          bn: `${base}/bn`,
          en: `${base}/en`,
        },
      },
    },
    {
      url: `${base}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          bn: `${base}/bn/about`,
          en: `${base}/en/about`,
        },
      },
    },
    {
      url: `${base}/biography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.95,
      alternates: {
        languages: {
          bn: `${base}/bn/biography`,
          en: `${base}/en/biography`,
        },
      },
    },
  ];

  // Media content pages
  const mediaSitemap: MetadataRoute.Sitemap = [
    {
      url: `${base}/videos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          bn: `${base}/bn/videos`,
          en: `${base}/en/videos`,
        },
      },
    },
    {
      url: `${base}/photos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          bn: `${base}/bn/photos`,
          en: `${base}/en/photos`,
        },
      },
    },
    {
      url: `${base}/audios`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          bn: `${base}/bn/audios`,
          en: `${base}/en/audios`,
        },
      },
    },
    {
      url: `${base}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          bn: `${base}/bn/gallery`,
          en: `${base}/en/gallery`,
        },
      },
    },
  ];

  // Written content pages
  const contentSitemap: MetadataRoute.Sitemap = [
    {
      url: `${base}/speeches`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          bn: `${base}/bn/speeches`,
          en: `${base}/en/speeches`,
        },
      },
    },
    {
      url: `${base}/writings`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          bn: `${base}/bn/writings`,
          en: `${base}/en/writings`,
        },
      },
    },
    {
      url: `${base}/poems`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          bn: `${base}/bn/poems`,
          en: `${base}/en/poems`,
        },
      },
    },
    {
      url: `${base}/quotes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          bn: `${base}/bn/quotes`,
          en: `${base}/en/quotes`,
        },
      },
    },
  ];

  // Historical and timeline pages
  const historicalSitemap: MetadataRoute.Sitemap = [
    {
      url: `${base}/timeline`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          bn: `${base}/bn/timeline`,
          en: `${base}/en/timeline`,
        },
      },
    },
    {
      url: `${base}/events`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          bn: `${base}/bn/events`,
          en: `${base}/en/events`,
        },
      },
    },
    {
      url: `${base}/july-revolution`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.95,
      alternates: {
        languages: {
          bn: `${base}/bn/july-revolution`,
          en: `${base}/en/july-revolution`,
        },
      },
    },
    {
      url: `${base}/inqilab-moncho`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          bn: `${base}/bn/inqilab-moncho`,
          en: `${base}/en/inqilab-moncho`,
        },
      },
    },
    {
      url: `${base}/martyrdom`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.95,
      alternates: {
        languages: {
          bn: `${base}/bn/martyrdom`,
          en: `${base}/en/martyrdom`,
        },
      },
    },
  ];

  // Location and memorial pages
  const memorialSitemap: MetadataRoute.Sitemap = [
    {
      url: `${base}/locations`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: {
        languages: {
          bn: `${base}/bn/locations`,
          en: `${base}/en/locations`,
        },
      },
    },
    {
      url: `${base}/tributes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          bn: `${base}/bn/tributes`,
          en: `${base}/en/tributes`,
        },
      },
    },
    {
      url: `${base}/memorial`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          bn: `${base}/bn/memorial`,
          en: `${base}/en/memorial`,
        },
      },
    },
  ];

  // Documentation and archive pages
  const documentationSitemap: MetadataRoute.Sitemap = [
    {
      url: `${base}/documents`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          bn: `${base}/bn/documents`,
          en: `${base}/en/documents`,
        },
      },
    },
    {
      url: `${base}/archive`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          bn: `${base}/bn/archive`,
          en: `${base}/en/archive`,
        },
      },
    },
    {
      url: `${base}/press`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          bn: `${base}/bn/press`,
          en: `${base}/en/press`,
        },
      },
    },
    {
      url: `${base}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          bn: `${base}/bn/news`,
          en: `${base}/en/news`,
        },
      },
    },
    {
      url: `${base}/sources`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          bn: `${base}/bn/sources`,
          en: `${base}/en/sources`,
        },
      },
    },
    {
      url: `${base}/citations`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          bn: `${base}/bn/citations`,
          en: `${base}/en/citations`,
        },
      },
    },
  ];

  // Social and community pages
  const socialSitemap: MetadataRoute.Sitemap = [
    {
      url: `${base}/social-posts`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.75,
      alternates: {
        languages: {
          bn: `${base}/bn/social-posts`,
          en: `${base}/en/social-posts`,
        },
      },
    },
    {
      url: `${base}/community`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          bn: `${base}/bn/community`,
          en: `${base}/en/community`,
        },
      },
    },
  ];

  // Interactive and utility pages
  const utilitySitemap: MetadataRoute.Sitemap = [
    {
      url: `${base}/requests`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          bn: `${base}/bn/requests`,
          en: `${base}/en/requests`,
        },
      },
    },
    {
      url: `${base}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: {
        languages: {
          bn: `${base}/bn/contact`,
          en: `${base}/en/contact`,
        },
      },
    },
    {
      url: `${base}/search`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: {
        languages: {
          bn: `${base}/bn/search`,
          en: `${base}/en/search`,
        },
      },
    },
    {
      url: `${base}/sitemap`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          bn: `${base}/bn/sitemap`,
          en: `${base}/en/sitemap`,
        },
      },
    },
  ];

  // Research and academic pages
  const researchSitemap: MetadataRoute.Sitemap = [
    {
      url: `${base}/research`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          bn: `${base}/bn/research`,
          en: `${base}/en/research`,
        },
      },
    },
    {
      url: `${base}/bibliography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: {
        languages: {
          bn: `${base}/bn/bibliography`,
          en: `${base}/en/bibliography`,
        },
      },
    },
    {
      url: `${base}/publications`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: {
        languages: {
          bn: `${base}/bn/publications`,
          en: `${base}/en/publications`,
        },
      },
    },
  ];

  // Legal and policy pages
  const legalSitemap: MetadataRoute.Sitemap = [
    {
      url: `${base}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
      alternates: {
        languages: {
          bn: `${base}/bn/privacy`,
          en: `${base}/en/privacy`,
        },
      },
    },
    {
      url: `${base}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
      alternates: {
        languages: {
          bn: `${base}/bn/terms`,
          en: `${base}/en/terms`,
        },
      },
    },
    {
      url: `${base}/copyright`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
      alternates: {
        languages: {
          bn: `${base}/bn/copyright`,
          en: `${base}/en/copyright`,
        },
      },
    },
    {
      url: `${base}/accessibility`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
      alternates: {
        languages: {
          bn: `${base}/bn/accessibility`,
          en: `${base}/en/accessibility`,
        },
      },
    },
  ];

  // Foundation and organization pages
  const organizationSitemap: MetadataRoute.Sitemap = [
    {
      url: `${base}/foundation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          bn: `${base}/bn/foundation`,
          en: `${base}/en/foundation`,
        },
      },
    },
    {
      url: `${base}/team`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          bn: `${base}/bn/team`,
          en: `${base}/en/team`,
        },
      },
    },
    {
      url: `${base}/partners`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          bn: `${base}/bn/partners`,
          en: `${base}/en/partners`,
        },
      },
    },
    {
      url: `${base}/donate`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          bn: `${base}/bn/donate`,
          en: `${base}/en/donate`,
        },
      },
    },
  ];

  // Combine all sitemaps
  return [
    ...coreSitemap,
    ...mediaSitemap,
    ...contentSitemap,
    ...historicalSitemap,
    ...memorialSitemap,
    ...documentationSitemap,
    ...socialSitemap,
    ...utilitySitemap,
    ...researchSitemap,
    ...legalSitemap,
    ...organizationSitemap,
  ];
}
