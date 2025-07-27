import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ['@/components', '@/forms', '@/action'],
		reactCompiler: true,
		useCache: true,
	},

	images: {
		remotePatterns: [
			{
				hostname: 'firebasestorage.googleapis.com',
				protocol: 'https',
			},
		],
	},

	/* config options here */
	turbopack: {
		rules: {
			'*.html': { as: '*.js', loaders: ['raw-loader'] },
		},
	},

	// buildをwebpackでする場合
	// webpack: (config) => {
	// 	config.module?.rules?.push({
	// 		test: /\.html$/i,
	// 		use: 'raw-loader',
	// 	})
	// 	return config
	// },
}

export default nextConfig
