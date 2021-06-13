// TODO integrate filewatcher-webpack-plugin
// REASON watch mdx files
// https://www.npmjs.com/package/filewatcher-webpack-plugin

module.exports = {
	webpack: (config, { defaultLoaders, isServer, dev }) => {
		// generate the sitemap on server
		if (isServer || dev) {
			require("./scripts/generate-sitemap")
			// 
			// require("./scripts/generate-rss")
		}

		return config
	}
}