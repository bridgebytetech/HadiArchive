import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "শহীদ ওসমান হাদির স্মৃতি সংগ্রহশালা | Shaheed Osman Hadi Memorial",
    template: "%s | শহীদ ওসমান হাদি",
  },
  description:
    "শহীদ শরীফ ওসমান বিন হাদির জীবন, কর্ম ও আদর্শের ডিজিটাল সংগ্রহশালা। Digital archive of Shaheed Sharif Osman Bin Hadi's life, work and ideals.",
  keywords: [
    "ওসমান হাদি",
    "Osman Hadi",
    "শহীদ",
    "Shaheed",
    "ইনকিলাব মঞ্চ",
    "জুলাই বিপ্লব",
    "বাংলাদেশ",
  ],
  authors: [{ name: "Memorial Archive Team" }],
  creator: "Memorial Archive Team",
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: "en_US",
    url: "https://shaheedosmanhadir.org",
    siteName: "শহীদ ওসমান হাদির স্মৃতি সংগ্রহশালা",
    title: "শহীদ ওসমান হাদির স্মৃতি সংগ্রহশালা",
    description:
      "শহীদ শরীফ ওসমান বিন হাদির জীবন, কর্ম ও আদর্শের ডিজিটাল সংগ্রহশালা",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "শহীদ ওসমান হাদি",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "শহীদ ওসমান হাদির স্মৃতি সংগ্রহশালা",
    description:
      "শহীদ শরীফ ওসমান বিন হাদির জীবন, কর্ম ও আদর্শের ডিজিটাল সংগ্রহশালা",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}