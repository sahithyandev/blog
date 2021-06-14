// TODO integrate filewatcher-webpack-plugin
// REASON watch mdx files
// https://www.npmjs.com/package/filewatcher-webpack-plugin

module.exports = {
	webpack: (config, { defaultLoaders, isServer, dev, webpack }) => {
		if (isServer || dev) {
			require("./scripts/generate-sitemap")
			// RSS feed file is created from the /posts endpoint on build time.
			// require("./scripts/generate-rss")
		}

		return config
	}
}