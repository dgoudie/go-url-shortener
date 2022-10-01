/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  async headers() {
    return [
      {
        source: '/api/link',
        headers: [
          {
            key: 'clear-site-data',
            value: '"cache"',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:name((?!console|api|auth|setup)[^/]+)/:parameters*',
        destination: '/api/handle/:name/:parameters*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/console/links',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
