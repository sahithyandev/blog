const fs = require('fs')

const renderToString = require("next-mdx-remote/render-to-string")

const { SITE_CONSTANTS } = require("../global")
const { POSTS_DATA_FILE, POSTS_DIR } = SITE_CONSTANTS
const markdownToHtml = require("../lib/markdown")

/**
 * Used externally only
 */
function getPostRaw(slug = "") {
	return fs.readFileSync(POSTS_DIR + slug + ".mdx")
}

async function loadPost(slug = "", wantContent = true, testing = false) {
	if (wantContent === undefined) wantContent = true

	const postDataObj = getAllPosts().find(post => {
		return post.slug === slug
	})
	if (postDataObj === undefined) {
		throw new Error("post not found")
	}

	if (testing) {
		// TODO find why this is not working
		const content = await markdownToHtml(postDataObj.__content)

		return {
			meta: { ...postDataObj, __content: '' },
			content
		}
	} else {
		postDataObj.content = await renderToString(postDataObj.__content)
	}

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