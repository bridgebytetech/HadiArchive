/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production-এও যেকোনো ডোমেইন থেকে ইমেজ লোড করার জন্য এই কনফিগারেশন
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // API রিকোয়েস্ট ব্যাকএন্ডে পাঠানোর জন্য rewrites কনফিগারেশন
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
