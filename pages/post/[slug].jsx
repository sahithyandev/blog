import { loadPost } from "../../helpers/post"
import { NormalDateFormat } from "../../helpers/other"
import { SITE_CONSTANTS } from "../../global"
import { BlogPost } from "components/"


const PostPage = ({ meta, content }) => {
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