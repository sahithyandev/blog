module.exports = {
	webpack: (config, { defaultLoaders, isServer, dev, webpack }) => {
		if (isServer || dev) {
			require("./scripts/generate-sitemap")
			// RSS feed file is created from the /posts endpoint on build time.
			// require("./scripts/generate-rss")
		}

		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				module: false
			}
		}

		config.module.rules.push({
			test: /\.svg$/,
			use: [{
				loader: "@svgr/webpack",
				options: {
					svgoConfig: {
						plugins: {
							removeViewBox: false
						}
					}
				}
			}]
		})

		return config
	}
}