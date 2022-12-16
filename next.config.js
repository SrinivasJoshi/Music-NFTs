/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'gateway.pinata.cloud',
				port: '',
				pathname: '/ipfs/**',
			},
		],
	},
};

module.exports = nextConfig;
