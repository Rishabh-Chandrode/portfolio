/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['drive.google.com'],
    },
  
    async headers() {
      return [
        {
          source: '/(.*)', // Apply to all routes
          headers: [
            {
              key: 'X-Robots-Tag',
              value: 'index, follow', // Allow indexing and crawling
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  