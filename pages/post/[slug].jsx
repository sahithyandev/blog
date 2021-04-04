import Head from "next/head"

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
	const twitterShareButton = createRef()

	/**
	 * Make the headings linkable using #heading-content
	 */
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
			el.id = el.innerText.replaceAll(" ", "-").toLowerCase()
		}
	}

	/**
	 * Find the external links and make them open in a new tab.
	 */
	const makeLinksExternal = () => {
		const aTags = Array.from(document.querySelectorAll('a'))
			.filter(aTag => {
				return new URL(aTag.href).origin !== window.location.origin
			})

		for (let t of aTags) {
			t.target = '_blank'
		}
	}

	useEffect(() => {
		twitterShareButton.current.href = encodeURI(`https://www.twitter.com/share?text=${title} by ${SITE_CONSTANTS.author}&url=${window.location.href.split("#")[0]}`)

		makeLinksExternal()
		createLinkables()
	})

	return (
		<>
			<HeadBase title={`${title} - ${SITE_CONSTANTS.title}`} description={description} />

			<Head>
				<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous" />
			</Head>

			<Nav />
			<main className="post-container">
				<h2 className={styles["post--title"]}>{title}</h2>
				<div className={styles["post--time"]}>{NormalDateFormat.format(dateCreated)}</div>

				<div ref={postContentRef} className={styles["post--content"]}>{hydrate(content)}</div>

				{/* TODO add a "give your feedback" section */}

				<div className={styles["post--share-section"]}>
					<span>Share this article on</span>
					<a className="reset" ref={twitterShareButton} title="Twitter">
						<i className="fab fa-twitter"></i>
					</a>
				</div>
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