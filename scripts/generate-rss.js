const fs = require("fs");

const RSS = require("rss");

const { getAllPosts, loadPost } = require("../helpers/post.js");
const { SITE_CONSTANTS } = require("../global");

const OUTPUT_FILE = "public/feed.xml";

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

/**
 * @param { import("../helpers/post.js").PostObject[] } posts
 */
export async function generateRSS(posts) {
	const feed = new RSS({
		title: SITE_CONSTANTS.title,
		site_url: SITE_CONSTANTS.website_url,
		feed_url: SITE_CONSTANTS.rss_feed_url
	})
	posts = posts || (await getAllPosts())

	await Promise.all(
		posts
			.map(async _post => {
				let post = await loadPost(_post.meta.slug)
				const meta = post.meta;
				feed.item({
					title: meta.title,
					description: post.mdxSource.renderedOutput,
					url: SITE_CONSTANTS.website_url + `post/${meta.slug}`,
					date: meta.dateCreated
				})
			})
	)

	fs.writeFileSync(OUTPUT_FILE, feed.xml({ indent: true }))
}