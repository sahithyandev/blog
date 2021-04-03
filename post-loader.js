/**
 * This script generates a json file from all the posts on the build time.
 * The script will contain the details of the posts (except content)
 * 
 * Recent (or all) posts can be loaded using this file, faster.
 */

const fs = require('fs')
const matter = require('gray-matter');
const { getPostRaw } = require("./helpers/post")
const { SITE_CONSTANTS } = require("./global")

const { POSTS_DIR, POSTS_DATA_FILE } = SITE_CONSTANTS

function __formatPost(slug = "") {
	const postRaw = getPostRaw(slug)
	const _extracted = matter(postRaw)
	const postDataObj = {
		..._extracted.data
	}

	postDataObj.dateCreated = new Date(+postDataObj.dateCreated).valueOf()
	postDataObj.slug = slug

	return postDataObj
}

function getAllPosts() {
	const postNameRegex = /.mdx?/

	const postFilesSlug = fs.readdirSync(POSTS_DIR)
		.filter(fileName => postNameRegex.test(fileName))
		.map(fileName => fileName.replace(postNameRegex, ""))

	const posts = postFilesSlug.map(slug => __formatPost(slug))

	return posts
}

const posts = getAllPosts()

console.log("Loaded", posts.length, "posts");

fs.writeFile(POSTS_DATA_FILE, JSON.stringify(posts, 0, 4), {}, (err) => {
	if (err) console.error(err)
})
