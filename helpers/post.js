const fs = require('fs')

const renderToString = require("next-mdx-remote/render-to-string")
const matter = require("gray-matter")

const { SITE_CONSTANTS } = require("../global")
const { POSTS_DATA_FILE, POSTS_DIR } = SITE_CONSTANTS

/**
 * Used externally only
 */
function getPostRaw(slug = "") {
	return fs.readFileSync(POSTS_DIR + slug + ".mdx")
}

async function loadPost(slug = "", wantContent = true) {
	if (wantContent === undefined) wantContent = true

	const postDataObj = getAllPosts().find(post => {
		return post.slug === slug
	})
	if (postDataObj === undefined) {
		throw new Error("post not found")
	}

	postDataObj.content = await renderToString(postDataObj.__content)

	return postDataObj
}

function getAllPosts() {
	return require("./../public/posts.json").sort((postA, postB) => {
		return -(new Date(postA.dateCreated) - new Date(postB.dateCreated))
	})
}

module.exports = {
	getPostRaw, loadPost, getAllPosts
}