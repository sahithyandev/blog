import { createRef, useEffect } from "react"
import hydrate from "next-mdx-remote/hydrate"

import { Nav, HeadBase, Footer } from "../../components"
import { loadPost } from "../../helpers/post"
import { NormalDateFormat } from "../../helpers/other"
import { SITE_CONSTANTS } from "../../global"

import styles from "../../styles/post.module.css"

const PostPage = (postData) => {
	const { slug, title, content, dateCreated, description } = postData
	const postContentRef = createRef()

	const createLinkables = () => {
		const LinkableElements = ["h1", "h2", "h3", "h4", "h5", "h6"]

		const linkablesRef = []
		for (let L of LinkableElements) {
			const availableLinkables = Array.from(postContentRef.current.querySelectorAll(L)).filter(el => {
				return !el.classList.contains("linkable")
			})
			linkablesRef.push(...availableLinkables)
		}

		for (let el of linkablesRef) {
			el.classList.add('linkable')
		}
	}

	useEffect(() => {
		createLinkables()
	})

	return (
		<>
			<HeadBase title={`${title} - ${SITE_CONSTANTS.title}`} description={description} />

			<Nav />

			<main className="post--container">
				<h2 className={styles["post--title"]}>{title}</h2>
				<div className={styles["post--time"]}>{NormalDateFormat.format(dateCreated)}</div>

				<div ref={postContentRef} className={styles["post--content"]}>{hydrate(content)}</div>

				{/* TODO add share feature */}
			</main>

			<Footer />
		</>
	)
}

export async function getServerSideProps(context) {
	let props = {
		slug: context.query.slug || "",
	}

	try {
		const _postData = await loadPost(props.slug)
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