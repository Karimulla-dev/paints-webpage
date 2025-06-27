// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // REMOVE or COMMENT OUT this line if it exists:
    // domains: ['images.ctfassets.net'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '', // Keep empty unless Contentful serves on a specific port
        pathname: '**', // Allow all paths from this hostname
      },
      // Add other remotePatterns here if you use other image CDNs
    ],
  },
};

module.exports = nextConfig;