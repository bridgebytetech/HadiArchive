import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

// Wikipedia-worthy metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL("https://hadiarchive.com"),
  title: {
    default: "Shaheed Osman Hadi Memorial Archive - Official Digital Repository | শহীদ শরীফ ওসমান বিন হাদি স্মৃতি সংগ্রহশালা",
    template: "%s - Shaheed Osman Hadi Official Archive",
  },
  description:
    "The official digital memorial archive and authoritative source for Shaheed Sharif Osman Bin Hadi (30 June 1993 – 18 December 2025). Comprehensive documentation of his life, martyrdom in the July Revolution, role as Inqilab Moncho spokesperson, writings, and historical impact on Bangladesh's democratic movement. Maintained by the Osman Hadi Foundation.",
  keywords: [
    // Primary identifiers
    "Sharif Osman Bin Hadi official archive",
    "শরীফ ওসমান বিন হাদি",
    "Osman Hadi martyrdom December 18 2025",
    "Shaheed Osman Hadi biography",
    
    // Historical significance
    "July Revolution Bangladesh 2024",
    "জুলাই বিপ্লব ২০২৪",
    "Inqilab Moncho spokesperson",
    "ইনকিলাব মঞ্চ মুখপাত্র",
    "Bangladesh student movement leader",
    "Anti-fascist activist Bangladesh",
    
    // Academic/Research keywords
    "Osman Hadi scholarly research",
    "Bangladesh political history 2024-2025",
    "July uprising documentation",
    "Shaheed memorial archive",
    "Digital humanities Bangladesh",
    
    // Location/Institution specific
    "University of Dhaka alumnus",
    "Nalchity Jhalakathi",
    "Mausoleum Kazi Nazrul Islam burial",
    "Singapore General Hospital December 2025",
    
    // Works and legacy
    "Lavay Lalshak Puber Akash book",
    "লাভায় লালশাক পূবের আকাশ",
    "Bangladesh sovereignty movement",
    "Indian hegemony opposition",
  ],
  
  authors: [
    { name: "Osman Hadi Foundation", url: "https://www.hadiarchive.com" },
    { name: "Inqilab Moncho Central Committee" },
    { name: "Memorial Archive Research Team" }
  ],
  
  creator: "Osman Hadi Foundation",
  publisher: "Osman Hadi Foundation",
  
  alternates: {
    canonical: 'https://www.hadiarchive.com',
    languages: {
      'en-US': 'https://www.hadiarchive.com/en',
      'bn-BD': 'https://www.hadiarchive.com/bn',
    },
    types: {
      'application/rss+xml': 'https://www.hadiarchive.com/rss.xml',
      'application/atom+xml': 'https://www.hadiarchive.com/atom.xml',
    },
  },
  
  openGraph: {
    type: "profile",
    firstName: "Sharif Osman Bin",
    lastName: "Hadi",
    username: "osmanhadi",
    gender: "male",
    locale: "en_US",
    alternateLocale: ["bn_BD", "ar_SA"],
    url: "https://www.hadiarchive.com",
    siteName: "Shaheed Osman Hadi Memorial Archive - Official Repository",
    title: "Shaheed Sharif Osman Bin Hadi (1993-2025) | Official Memorial Archive & Historical Documentation",
    description:
      "The authoritative digital repository documenting the life, work, and martyrdom of Shaheed Sharif Osman Bin Hadi. Primary source for researchers, historians, and journalists covering Bangladesh's July Revolution and democratic movements.",
    determiner: "the",
    images: [
      {
        url: "https://www.hadiarchive.com/images/og-image.jpeg",
        secureUrl: "https://www.hadiarchive.com/images/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Shaheed Sharif Osman Bin Hadi - Official Portrait",
        type: 'image/jpeg',
      },
      {
        url: "https://www.hadiarchive.com/images",
        width: 1200,
        height: 1200,
        alt: "Osman Hadi at July Revolution 2024",
      },
      {
        url: "https://www.hadiarchive.com/images",
        width: 1080,
        height: 1080,
        alt: "Osman Hadi as Inqilab Moncho Spokesperson",
      },
    ],
    audio: [
      {
        url: "https://www.hadiarchive.com/audio",
        type: "audio/mpeg",
      }
    ],
    videos: [
      {
        url: "https://www.hadiarchive.com/video",
        type: "video/mp4",
        width: 1920,
        height: 1080,
      }
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@OsmanHadiArchive",
    siteId: "1234567890",
    creator: "@InqilabMoncho",
    creatorId: "0987654321",
    title: "Shaheed Osman Hadi Memorial Archive | Official Repository",
    description:
      "Authoritative source for Shaheed Sharif Osman Bin Hadi's life & martyrdom. Primary research repository for Bangladesh's July Revolution.",
    images: {
      url: "https://www.hadiarchive.com/images/og-image.jpeg",
      alt: "Shaheed Osman Hadi Memorial Archive",
    },
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  
  manifest: '/site.webmanifest',
  
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    bing: 'your-bing-verification-code',
    yahoo: 'your-yahoo-verification-code',
    facebook: 'your-facebook-verification-code',
  },
  
  category: 'memorial',
  classification: 'Digital Archive',
  
  other: {
    'dc.title': 'Shaheed Osman Hadi Memorial Archive',
    'dc.creator': 'Osman Hadi Foundation',
    'dc.subject': 'Biography, History, Politics, Bangladesh',
    'dc.description': 'Official digital archive of Shaheed Sharif Osman Bin Hadi',
    'dc.publisher': 'Osman Hadi Foundation',
    'dc.contributor': 'Inqilab Moncho',
    'dc.date': '2025-12-20',
    'dc.type': 'Digital Archive',
    'dc.format': 'text/html',
    'dc.identifier': 'https://www.hadiarchive.com',
    'dc.source': 'Primary Source Archive',
    'dc.language': 'en, bn',
    'dc.coverage': 'Bangladesh, 1993-2025',
    'dc.rights': 'Copyright 2025 Osman Hadi Foundation. CC BY-SA 4.0',
    'citation_title': 'Shaheed Osman Hadi Memorial Archive',
    'citation_author': 'Osman Hadi Foundation',
    'citation_publication_date': '2025/12/20',
    'citation_journal_title': 'Digital Memorial Archives',
    'citation_volume': '1',
    'citation_issue': '1',
    'citation_firstpage': '1',
    'citation_lastpage': '100',
    'citation_pdf_url': 'https://www.hadiarchive.com/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical Meta Tags for Wikipedia Citation */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Dublin Core Metadata for Academic Citation */}
        <link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />
        <link rel="schema.DCTERMS" href="http://purl.org/dc/terms/" />
        
        {/* Canonical URL for Wikipedia */}
        <link rel="canonical" href="https://www.hadiarchive.com" />
        
        {/* RSS/Atom Feeds for Updates */}
        <link rel="alternate" type="application/rss+xml" title="Osman Hadi Archive Updates" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Osman Hadi Archive Atom Feed" href="/atom.xml" />
        
        {/* Comprehensive Schema.org Structured Data */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://www.hadiarchive.com/#person",
              "url": "https://www.hadiarchive.com",
              "name": "Sharif Osman Bin Hadi",
              "alternateName": ["Osman Hadi", "ওসমান হাদি", "শরীফ ওসমান বিন হাদি", "Osman Goni"],
              "image": "https://www.hadiarchive.com/images/og-image.jpeg",
              "description": "Bangladeshi poet, political activist, and martyr. Co-founder and spokesperson of Inqilab Moncho. Key figure in Bangladesh's July Revolution 2024.",
              "birthDate": "1993-06-30",
              "birthPlace": {
                "@type": "Place",
                "name": "Nalchity Upazila",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Nalchity",
                  "addressRegion": "Jhalakathi",
                  "addressCountry": "BD"
                }
              },
              "deathDate": "2025-12-18",
              "deathPlace": {
                "@type": "Hospital",
                "name": "Singapore General Hospital",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Bukit Merah",
                  "addressRegion": "Central Region",
                  "addressCountry": "SG"
                }
              },
              "nationality": {
                "@type": "Country",
                "name": "Bangladesh"
              },
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "University of Dhaka",
                  "department": "Department of Political Science",
                  "url": "https://www.du.ac.bd"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "Jhalakati N S Kamil Madrasa"
                }
              ],
              "memberOf": {
                "@type": "Organization",
                "name": "Inqilab Moncho",
                "url": "https://www.inqilabmoncho.org",
                "foundingDate": "2024-08-13"
              },
              "jobTitle": [
                "Political Activist",
                "Spokesperson of Inqilab Moncho",
                "Writer",
                "Lecturer"
              ],
              "worksFor": {
                "@type": "EducationalOrganization",
                "name": "University of Scholars",
                "department": "Department of Business Studies"
              },
              "parent": [
                {
                  "@type": "Person",
                  "name": "Maulana Abdul Hadi",
                  "jobTitle": "Imam and Madrasa Teacher"
                },
                {
                  "@type": "Person",
                  "name": "Taslima Hadi"
                }
              ],
              "award": "Martyr of July Revolution",
              "sameAs": [
                "https://en.wikipedia.org/wiki/Osman_Hadi",
                "https://bn.wikipedia.org/wiki/ওসমান_হাদি",
                "https://www.wikidata.org/wiki/Q123456789",
                "https://www.facebook.com/OsmanHadiOfficial",
                "https://twitter.com/OsmanHadi",
                "https://www.youtube.com/@OsmanHadiOfficial"
              ],
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.hadiarchive.com"
              }
            }),
          }}
        />
        
        {/* Organization Schema for Foundation */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.hadiarchive.com/#organization",
              "name": "Osman Hadi Foundation",
              "alternateName": "Shaheed Osman Hadi Memorial Trust",
              "url": "https://www.hadiarchive.com",
              "logo": "https://www.hadiarchive.com/images/og-image.jpeg",
              "description": "Official foundation managing the memorial archive of Shaheed Sharif Osman Bin Hadi",
              "foundingDate": "2025-12-20",
              "founder": {
                "@type": "Organization",
                "name": "Inqilab Moncho"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dhaka",
                "addressCountry": "BD"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "General Inquiries",
                "email": "info@hadiarchive.com",
                "availableLanguage": ["English", "Bengali"]
              },
              "sameAs": [
                "https://www.facebook.com/OsmanHadiFoundation",
                "https://twitter.com/HadiFoundation"
              ]
            }),
          }}
        />
        
        {/* Archive/Collection Schema */}
        <Script
          id="archive-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ArchiveComponent",
              "@id": "https://www.hadiarchive.com/#archive",
              "name": "Shaheed Osman Hadi Digital Archive",
              "description": "Comprehensive digital collection documenting the life and work of Shaheed Osman Hadi",
              "creator": {
                "@type": "Organization",
                "name": "Osman Hadi Foundation"
              },
              "dateCreated": "2025-12-20",
              "inLanguage": ["en", "bn"],
              "license": "https://creativecommons.org/licenses/by-sa/4.0/",
              "maintainer": {
                "@type": "Organization",
                "name": "Memorial Archive Team"
              },
              "isPartOf": {
                "@type": "ArchiveOrganization",
                "name": "Bangladesh Digital Memorial Archives"
              },
              "hasPart": [
                {
                  "@type": "Collection",
                  "name": "Personal Documents",
                  "description": "Birth certificates, academic records, personal letters"
                },
                {
                  "@type": "Collection",
                  "name": "Political Activities",
                  "description": "Speeches, manifestos, organizational documents"
                },
                {
                  "@type": "Collection",
                  "name": "July Revolution Documentation",
                  "description": "Photos, videos, witness testimonies from July 2024"
                },
                {
                  "@type": "Collection",
                  "name": "Literary Works",
                  "description": "Published and unpublished writings"
                }
              ]
            }),
          }}
        />
        
        {/* Book/CreativeWork Schema for his book */}
        <Script
          id="book-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              "name": "লাভায় লালশাক পূবের আকাশ",
              "alternateName": "Lavay Lalshak Puber Akash",
              "author": {
                "@type": "Person",
                "name": "Sharif Osman Bin Hadi"
              },
              "datePublished": "2024-02",
              "publisher": {
                "@type": "Organization",
                "name": "Duar Publications"
              },
              "inLanguage": "bn",
              "isbn": "978-984-XXXXX-X-X",
              "numberOfPages": "200"
            }),
          }}
        />
        
        {/* WebSite Schema with SearchAction */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.hadiarchive.com/#website",
              "url": "https://www.hadiarchive.com",
              "name": "Shaheed Osman Hadi Memorial Archive",
              "description": "Official digital memorial and research archive",
              "publisher": {
                "@id": "https://www.hadiarchive.com/#organization"
              },
              "potentialAction": [
                {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://www.hadiarchive.com/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              ],
              "inLanguage": ["en-US", "bn-BD"]
            }),
          }}
        />
        
        {/* BreadcrumbList Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.hadiarchive.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Biography",
                  "item": "https://www.hadiarchive.com/tribute"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "July Revolution",
                  "item": "https://www.hadiarchive.com/photos"
                }
              ]
            }),
          }}
        />
        
        {/* FAQ Schema for Common Questions */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Who was Sharif Osman Bin Hadi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sharif Osman Bin Hadi (1993-2025) was a Bangladeshi political activist, writer, and spokesperson of Inqilab Moncho who became a martyr during Bangladesh's democratic movement."
                  }
                },
                {
                  "@type": "Question",
                  "name": "When did Osman Hadi die?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Osman Hadi died on December 18, 2025, at Singapore General Hospital, six days after being shot in Dhaka on December 12, 2025."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is Inqilab Moncho?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Inqilab Moncho is a youth-led political platform that emerged from Bangladesh's July 2024 protests, advocating for sovereignty and democratic reform."
                  }
                }
              ]
            }),
          }}
        />
      </head>
      
      <body className={inter.className}>
        <Providers>
          {/* Skip to main content for accessibility */}
          <a href="#main" className="sr-only focus:not-sr-only">
            Skip to main content
          </a>
          
          {children}
          <Toaster />
        </Providers>

        {/* Google Analytics with Enhanced Ecommerce */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NSCWXWSDXQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NSCWXWSDXQ', {
              page_path: window.location.pathname,
              custom_map: {
                'dimension1': 'visitor_type',
                'dimension2': 'content_category',
                'metric1': 'engagement_time'
              }
            });
            
            // Track memorial page views
            gtag('event', 'page_view', {
              page_title: 'Shaheed Osman Hadi Memorial',
              page_location: window.location.href,
              page_path: window.location.pathname,
              content_group: 'memorial'
            });
          `}
        </Script>
        
            {/* ✅ Google Analytics */}
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-NSCWXWSDXQ"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-NSCWXWSDXQ');
      `}
    </Script>
      </body>
    </html>
  );
}
