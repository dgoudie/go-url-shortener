/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
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
