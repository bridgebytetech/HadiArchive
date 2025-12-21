import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Shaheed Osman Hadi Memorial",
  description: "Administrative dashboard for managing memorial content",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}