import hydrate from "next-mdx-remote/hydrate"

import { getAllPosts, loadPost } from "../../helpers/post"
import { BlogPost } from "components/"
import { MDXComponents } from "components/MDXComponents"


const PostPage = ({ meta, mdxSource }) => {
	const content = hydrate(mdxSource, {
		components: MDXComponents
	})

	return <BlogPost meta={meta}>{content}</BlogPost>
}

export async function getStaticPaths() {
	const posts = await getAllPosts()

	return {
		paths: posts.map(p => ({
			params: {
				slug: p.meta.slug
			}
		})),
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const post = await loadPost(params.slug)

	return { props: post }
}

// TODO @REMOVE
// export async function getServerSideProps(context) {
// 	let props = {
// 		slug: context.query.slug || "",
// 	}

// 	try {
// 		const _postData = await loadPost(props.slug, true)

// 		props = { ...props, ..._postData }
// 	} catch (e) {
// 		console.warn(e)

// 		return {
// 			notFound: true
// 		}
// 	}

// 	return {
// 		props
// 	}
// }


export default PostPage