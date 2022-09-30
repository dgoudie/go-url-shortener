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
        source: '/:param_1*',
        headers: [
          {
            key: 'cache-control',
            value: 'stale-while-revalidate',
          },
        ],
      },
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
