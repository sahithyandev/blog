import { MDXRemote } from "next-mdx-remote"

import { loadPost, getAllSlugs } from "@/helpers/post"
import { BlogPost, MDXComponents } from "@/components"
import { images } from "@/assets/post__images"

const PostPage = ({ meta, mdxSource, sourceContent }) => {
	return <BlogPost meta={meta}>
		<MDXRemote {...mdxSource} components={MDXComponents} scope={{ sourceContent, images }} />
	</BlogPost>
}

export async function getStaticPaths() {
	let slugs = await getAllSlugs()

	return {
		paths: slugs.map(slug => ({
			params: { slug }
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