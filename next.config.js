/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ✅ এই লাইনটি মাস্ট লাগবেই (৪০২ এরর এবং থাম্বনেইল না আসার মেইন কারণ এটি)
    unoptimized: true, 
    
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

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.hadiarchive.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
