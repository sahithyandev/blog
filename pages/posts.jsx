import { useState } from "react"

import { HeadBase, Nav, Footer, PostCard } from "@/components/"
import { getAllPosts } from "@/helpers/post"
import { SITE_CONSTANTS } from "../global"
import { isTag } from "@/helpers/other"
import { generateRSS } from "@/scripts/generate-rss"

import styles from "@/styles/posts.module.css"

const debounce = (func, timeout = 400) => {
	let timer;

	return (...args) => {
		clearTimeout(timer)

		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

/**
 * @typedef PostsPageProps
 * 
 * @property {import("@/helpers/post").PostObject[]} posts
 */

/**
 * @param {PostsPageProps} props
 */
const PostsPage = props => {
	const { posts } = props
	const [searchObj, setSearch] = useState({
		searchTags: [],
		searchString: ""
	})

	/**
	 * My search logic
	 * TODO  make it easy to read 
	 * TODO make it maintainable 
	 * 
	 * @param {import("@/helpers/post").PostObject[]} postsArr
	 */
	const filterPosts = (postsArr) => {
		const { searchTags, searchString } = searchObj
		return postsArr
			// filter by tags
			.filter(post => {
				return (searchTags.length < 1) ? true : (
					// TODO add an explanation
					post.meta.tags.some(postTag => {
						return searchTags.some(searchTag => postTag.includes(searchTag))
					}));
			})
			// filter by the searchString
			.filter(post => {
				const title = post.meta.title.toLowerCase()
				// if the searchString is a substring of the title or vice versa
				return searchString.includes(title) || title.includes(searchString)
			})
		// return postsArr.filter(post => {
		// 	const title = post.meta.title.toLowerCase()
		// 	const { searchString, tags } = searchObj
		// 	let result = true

		// 	if (tags.length > 0) {
		// 		// check if a post's tags contain the searched tags
		// 		result = result && post.meta.tags.some(postTag => {
		// 			return tags.some(tag => postTag.includes(tag))
		// 		})
		// 	}

		// 	// check if the search is included in the title of a post
		// 	result = result && (searchString.includes(title) || title.includes(searchString))

		// 	return result;
		// })
	}

	/**
	 * @param {string} searchString
	 * 
	 * @returns {string[]}
	 */
	const findTags = (searchString) => searchString
		.split(" ")
		.filter(isTag)
		.map(tag => tag.slice(1))

	/**
	 * @param {string} searchString
	 * @returns {string}
	 */
	const removeTags = (searchString) => searchString
		.split(" ")
		.filter(word => !isTag(word))
		.join(" ")

	const searchInputHandler = debounce((event) => {
		const searchInput = event.target.value.toLowerCase()
		// for GA
		if (gtag) {
			gtag("event", "search_posts", {
				searchInput
			})
		}

		setSearch({
			searchTags: findTags(searchInput),
			searchString: removeTags(searchInput)
		})
	})

	return (
		<>
			<HeadBase title={`Posts - ${SITE_CONSTANTS.title}`} />

			<Nav />

			<main>
				<h2>Posts</h2>

				<p>Here are the articles I wrote before. Use the search to filter by title and/or tag.</p>

				<div className={styles["search-container"]}>
					<input type="text" className={styles["search-input"]} placeholder="Search articles"
						onChange={searchInputHandler} />
				</div>

				<div className="posts-container">
					{filterPosts(posts)
						.map(_post => <PostCard key={_post.meta.title} {..._post.meta} />)}
				</div>
			</main>

			<Footer />
		</>
	)
}

export async function getStaticProps(context) {
	const posts = await getAllPosts();
	await generateRSS(posts);

	return {
		props: {
			posts
		}
	}
}


export default PostsPage