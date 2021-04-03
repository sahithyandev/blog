const fs = require('fs')
const { SITE_CONSTANTS } = require("../global")
const renderToString = require("next-mdx-remote/render-to-string")
const matter = require("gray-matter")

const { POSTS_DATA_FILE, POSTS_DIR } = SITE_CONSTANTS

function getPostRaw(slug = "") {
	return fs.readFileSync(POSTS_DIR + slug + ".mdx")
}

async function loadPost(slug = "", wantContent = true) {
	if (wantContent === undefined) wantContent = true

	const postDataObj = getAllPosts().find(post => {
		return post.slug === slug
	})

	const postRaw = getPostRaw(slug)
	const content = matter(postRaw).content

	if (wantContent) {
		postDataObj.content = await renderToString(content)
	}

	return postDataObj
}

function getAllPosts() {
	return JSON.parse(fs.readFileSync(POSTS_DATA_FILE))
}

module.exports = {
	getPostRaw, loadPost, getAllPosts
}