const fs = require('fs')
// TODO try to move to fsAsync
const fsAsync = fs.promises
const { join } = require("path")

const renderToString = require("next-mdx-remote/render-to-string")
const matter = require("gray-matter")
const mdxPrism = require("mdx-prism")

const { SITE_CONSTANTS } = require("../global")
const { POSTS_DIR } = SITE_CONSTANTS
const { MDXComponents } = require('components/MDXComponents')

const isProduction = process.env.NODE_ENV === "production"
/**
 * Checks if the post is finished and ready on production
 * 
 * @param {string} slug
 */
const isPostCompleted = slug => slug.charAt(0) !== "-"

async function loadPost(slug = "") {
	const postDataObj = (await getAllPosts()).find(post => {
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
	// const realSlug = slug.replace(/\.mdx$/, "")
	const fullPath = join(POSTS_DIR, slug + ".mdx")
	const fileContent = fs.readFileSync(fullPath)
	const { data, content } = matter(fileContent)

	return {
		meta: {
			slug,
			...formatPostMeta(data, content)
		},
		content
	}
}

async function doesPostExist(slug) {
	const allPosts = await getAllPosts()
	const post = allPosts.find(post => post.meta.slug === slug)

	return post !== undefined
}

async function getAllPosts() {
	const slugs = await getAllSlugs()
	const posts = slugs.map(slug => getPostBySlug(slug))
	posts.sort((postA, postB) => {
		// recent posts first
		return postB.meta.dateCreated - postA.meta.dateCreated
	})

	return posts;
}

async function getAllSlugs() {
	const postsDir = join(process.cwd(), "posts")
	return (await fsAsync.readdir(postsDir))
		.map(slug => slug.replace(/\.mdx$/i, ""))
		// filter the not-finished blog posts on production
		.filter(slug => isProduction ? isPostCompleted(slug) : true)
}

module.exports = {
	loadPost, getAllPosts, doesPostExist, getAllSlugs, isPostCompleted
}