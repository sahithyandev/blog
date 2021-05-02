const fs = require("fs")

const globby = require("globby");
const prettier = require("prettier");

const WEBSITE_URL = "https://sahithyandev.github.io";
const OUTPUT_FILE = "public/sitemap.xml";

/**
 * @param {Date} mtime
 */
const lastModifiedTimeFormat = (mtime) => {
	const _ = new Intl.DateTimeFormat("en", {
		day: "2-digit",
		year: "numeric",
		month: "2-digit"
	})

	const [month, date, year] = _.format(mtime).split("/");
	return [year, month, date].join("-")
}

(async () => {
	const _pages = await globby([
		"pages/*.jsx",
		"!pages/api",
		"posts/!(-)*.mdx",
	])

	const urlTags = _pages.map(_path => {
		const path = _path
			.replace("pages/", "")
			.replace("posts/", "post/")
			.replace(/\.\w+/, "")

		const route = path === "index" ? "" : path
		const lastModifiedTime = lastModifiedTimeFormat(fs.statSync(_path).mtime)

		return `<url>
							<loc>${WEBSITE_URL}/${route}</loc>
							<changefreq>monthly</changefreq>
							<lastmod>${lastModifiedTime}</lastmod>
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
