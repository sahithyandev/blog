import hydrate from "next-mdx-remote/hydrate"

import { loadPost } from "../../helpers/post"
import { NormalDateFormat } from "../../helpers/other"
import { SITE_CONSTANTS } from "../../global"
import { BlogPost } from "components/"
import { MDXComponents } from "components/MDXComponents"


const PostPage = ({ meta, mdxSource }) => {
	const content = hydrate(mdxSource, {
		components: MDXComponents
	})

	return <BlogPost meta={meta}>{content}</BlogPost>
}

export async function getServerSideProps(context) {
	let props = {
		slug: context.query.slug || "",
	}

	try {
		const _postData = await loadPost(props.slug, true)

		props = { ...props, ..._postData }
	} catch (e) {
		console.warn(e)

		return {
			notFound: true
		}
	}

	return {
		props
	}
}


export default PostPage