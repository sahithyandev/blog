const fs = require('fs')
const { join } = require("path")

const renderToString = require("next-mdx-remote/render-to-string")
const matter = require("gray-matter")
const mdxPrism = require("mdx-prism")

const { SITE_CONSTANTS } = require("../global")
const { POSTS_DIR } = SITE_CONSTANTS
const { MDXComponents } = require('components/MDXComponents')

/**
 * @deprecated @REMOVE_IT_IN_FUTURE
 * Used externally only
 */
function getPostRaw(slug = "") {
	return fs.readFileSync(POSTS_DIR + slug + ".mdx")
}

async function loadPost(slug = "", wantContent = true) {
	if (wantContent === undefined) wantContent = true

	const postDataObj = getAllPosts().find(post => {
		return post.meta.slug === slug
	})
	if (postDataObj === undefined) {
		throw new Error("post not found")
	}

	const mdxSource = await renderToString(postDataObj.content, {
		components: MDXComponents,
		mdxOptions: {
			rehypePlugins: [mdxPrism]
		}
	})

	return {
		meta: postDataObj.meta,
		mdxSource
	}
}

function formatPostMeta(meta, content) {
	const formattedMeta = meta;

	if (formattedMeta.tags === undefined) {
		formattedMeta.tags = []
	} else if (typeof formattedMeta.tags === "string") {
		formattedMeta.tags = formattedMeta.tags.split(',')
	}

	formattedMeta.dateCreated = new Date(+formattedMeta.dateCreated).valueOf()

	const wordCount = content.split(/\s+/gu).length
	const AVERAGE_READING_SPEED = 200
	formattedMeta.estReadTime = Math.ceil(wordCount / AVERAGE_READING_SPEED)

	return formattedMeta;
}

/**
 * @param {string} slug
 */
function getPostBySlug(slug) {
	const realSlug = slug.replace(/\.mdx$/, "")
	const fullPath = join(POSTS_DIR, slug)
	const fileContent = fs.readFileSync(fullPath)
	const { data, content } = matter(fileContent)

	return {
		meta: {
			slug: realSlug,
			...formatPostMeta(data, content)
		},
		content
	}
}

function doesPostExist(slug) {
	const allPosts = getAllPosts()
	const post = allPosts.find(post => post.meta.slug === slug)

	return post !== undefined
}

function getAllPosts() {
	const slugs = fs.readdirSync(POSTS_DIR)
	const posts = slugs.map(slug => getPostBySlug(slug))
	posts.sort((postA, postB) => {
		// recent posts first
		return postB.meta.dateCreated - postA.meta.dateCreated
	})

	return posts;
}

module.exports = {
	getPostRaw, loadPost, getAllPosts, doesPostExist
}