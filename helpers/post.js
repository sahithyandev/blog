const fs = require('fs')
// TODO try to move to fsAsync
const fsAsync = fs.promises
const { join } = require("path")

const matter = require("gray-matter")
const mdxPrism = require("mdx-prism")

const { SITE_CONSTANTS } = require("../global")
const { POSTS_DIR } = SITE_CONSTANTS
const AVERAGE_READING_SPEED = 200

const isProduction = process.env.NODE_ENV === "production";

/**
 * Checks if the post is finished and ready on production
 * 
 * @param {string} slug
 */
const isPostCompleted = slug => slug.charAt(0) !== "-";

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

async function loadPost(slug = "") {
	const { MDXComponents } = require('../components/MDXComponents.jsx')
	const { serialize } = require("next-mdx-remote/serialize")

	const postDataObj = (await getAllPosts()).find(post => {
		return post.meta.slug === slug
	})
	if (postDataObj === undefined) {
		throw new Error("post not found")
	}

	const mdxSource = await serialize(postDataObj.content, {
		mdxOptions: {
			rehypePlugins: [mdxPrism]
		}
	})

	return {
		meta: postDataObj.meta,
		mdxSource
	}
}

/**
 * @typedef PostMetaObject
 * 
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {number} dateCreated
 * @property {number} lastModifiedTime
 * @property {string[]} tags
 * @property {number} estReadTime
 * 
 */

/**
 * @param {object} meta
 * @param {string} content
 * 
 * @returns {PostMetaObject} 
 */
function formatPostMeta(meta, content) {
	/**
	 * @type {PostMetaObject}
	 */
	const formattedMeta = meta;

	if (formattedMeta.tags === undefined) {
		formattedMeta.tags = []
	} else if (typeof formattedMeta.tags === "string") {
		formattedMeta.tags = formattedMeta.tags
			.split(',')
			.map(
				/**
				 * @param {string} tagString
				 */
				tagString => tagString.trim()
			)
	}

	formattedMeta.dateCreated = (formattedMeta.dateCreated || new Date()).valueOf()

	const wordCount = content.split(/\s+/gu).length

	formattedMeta.estReadTime = Math.ceil(wordCount / AVERAGE_READING_SPEED)

	return formattedMeta;
}

/**
 * @typedef PostObject
 * 
 * @property {PostMetaObject} meta
 * @property {string} content 
 */

/**
 * @param {string} slug
 * 
 * @returns {PostObject}
 */
function getPostBySlug(slug) {
	// const realSlug = slug.replace(/\.mdx$/, "")
	const fullPath = join(POSTS_DIR, slug + ".mdx")
	const fileContent = fs.readFileSync(fullPath)
	const { data, content } = matter(fileContent)
	const meta = formatPostMeta(data, content)

	data.lastModifiedTime = fs.statSync(fullPath).mtime.valueOf()
	meta.slug = slug;

	return {
		meta,
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