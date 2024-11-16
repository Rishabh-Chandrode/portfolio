module.exports = {
    async headers() {
      return [
        {
          // Apply to all pages (all routes)
          source: '/(.*)',  // This ensures all pages are included
          headers: [
            {
              key: 'X-Robots-Tag',
              value: 'index, follow', // Allow indexing and following links
            },
          ],
        },
      ];
    },
  
    // Other configurations if needed
    siteUrl: 'https://portfolio-rishabh-chandrodes-projects.vercel.app/',  // Your site URL for sitemap generation
    generateRobotsTxt: true, // Ensure robots.txt is generated
    sitemapSize: 5000, // Sitemap size
    changefreq: 'daily', // Frequency of updates for the sitemap
    priority: 0.7, // Priority of the site in the sitemap
  };
  