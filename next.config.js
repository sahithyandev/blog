// TODO integrate filewatcher-webpack-plugin
// REASON watch mdx files
// https://www.npmjs.com/package/filewatcher-webpack-plugin

module.exports = {
	webpack: (config, { defaultLoaders, isServer }) => {
		// generate the sitemap on server
		if (isServer) {
			require("./scripts/generate-sitemap")
		}

		return config
	}
}