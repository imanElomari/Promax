/** @type {import('next').NextConfig} */
const path = await import('path');

const nextConfig = {
	webpack: (config) => {
		config.resolve = config.resolve || {};
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'@': path.resolve(process.cwd(), 'src'),
		};

		return config;
	},
};

export default nextConfig;
