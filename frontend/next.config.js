/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sflearnershub.com" },
      { protocol: "https", hostname: "**.wp.com" },
      { protocol: "https", hostname: "**.wordpress.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async redirects() {
    return [
      // Preserve WordPress category URL structure
      { source: "/category/:path*", destination: "/category/:path*", permanent: false },
    ];
  },
};

module.exports = nextConfig;
