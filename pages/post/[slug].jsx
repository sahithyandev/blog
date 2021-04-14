
import { createRef, useEffect } from "react"

import { loadPost } from "../../helpers/post"
import { NormalDateFormat } from "../../helpers/other"
import { SITE_CONSTANTS } from "../../global"
import { BlogPost } from "components/"


const PostPage = ({ meta, content }) => {
	// const { slug, title, content, dateCreated, description, tags, estReadTime } = postData

	return <BlogPost meta={meta}>{content}</BlogPost>
}

export async function getServerSideProps(context) {
	let props = {
		slug: context.query.slug || "",
	}

	try {
		const _postData = await loadPost(props.slug, true, true)
		console.log(_postData.meta)

		props = { ...props, ..._postData }
	} catch (e) {
		console.log(e)

		return {
			notFound: true
		}
	}

	return {
		props
	}
}


export default PostPage