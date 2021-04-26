const fs = require("fs")

const globby = require("globby");
const prettier = require("prettier");

const WEBSITE_URL = "https://sahithyandev.github.io/";
const OUTPUT_FILE = "public/sitemap.xml";

(async () => {
	const _pages = await globby([
		"pages/*.jsx",
		"!pages/api",
		"posts/*.mdx"
	])

	const pages = _pages.map(page => page
		.replace("pages/", "")
		.replace("posts/", "post/")
		.replace(/\.\w+/, "")
	)

	const urlTags = pages.map(path => {
		const route = path === "index" ? "" : path;
		return `<url>
							<loc>${WEBSITE_URL}${route}</loc>
					</url>`
	})

	const sitemap = `
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				${urlTags.join(' ')}
			</urlset>
	`

	const formatted = prettier.format(sitemap, {
		parser: "html"
	})

	fs.writeFileSync(OUTPUT_FILE, formatted)
	console.log(`sitemap has been created at ${OUTPUT_FILE}`)
})()
