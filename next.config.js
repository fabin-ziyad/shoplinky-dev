/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Not using 'export'
    images: {
      unoptimized: false, // Using Vercel's image optimization
    },
    images: {
        domains: ['shoplinky-stage.s3.amazonaws.com','d370e5b7u6e9y.cloudfront.net'], // Only the domain name
    },
};

module.exports = nextConfig;
