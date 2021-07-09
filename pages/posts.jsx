import { useState } from "react"
import tw from "twin.macro";
import styled from "styled-components";

import { HeadBase, Nav, Footer, PostsContainer } from "@/components/"
import { getAllPosts } from "@/helpers/post"
import { SITE_CONSTANTS } from "../global"
import { isTag } from "@/helpers/other"
import { generateRSS } from "@/scripts/generate-rss"

const Input = styled.input`
	${tw`border-none w-full py-2 px-4 rounded text-small`}
	background-color: #2d2f2ff3;
	
	&::placeholder {
		${tw`opacity-80 text-light`}
		font-family: Inter, ui-sans-serif, sans-serif;
	}
`;

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
				<h1>Posts</h1>

				<p>Here are the articles I wrote before. Use the search to filter by title and/or tag.</p>

				<div css={tw`mt-3 mb-9`}>
					<Input type="text" placeholder="Search posts" onChange={searchInputHandler} />
				</div>

				<PostsContainer posts={filterPosts(posts)} />
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