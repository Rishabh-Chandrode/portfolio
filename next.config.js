/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "drive.google.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
				pathname: "**",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/(.*)", // Apply to all routes
				headers: [
					{
						key: "X-Robots-Tag",
						value: "index, follow", // Allow indexing and crawling
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
