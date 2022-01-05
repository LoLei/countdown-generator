/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/countdown/:slug',
        destination: '/:slug',
        permanent: false,
      },
    ];
  },
};
