import Head from "next/head"

// TODO implement syntax highlighting 
// reference: https://mdxjs.com/guides/syntax-highlighting

import { createRef, useEffect } from "react"
import hydrate from "next-mdx-remote/hydrate"

import { Nav, HeadBase, Footer } from "../../components"
import { loadPost } from "../../helpers/post"
import { NormalDateFormat } from "../../helpers/other"
import { SITE_CONSTANTS } from "../../global"

import styles from "../../styles/post.module.css"

const PostPage = (postData) => {
	const { slug, title, content, dateCreated, description, tags, estReadTime } = postData
	const postContentRef = createRef()

	/**
	 * Make the headings linkable using #heading-content
	 */
	const createLinkables = () => {
		if (!postContentRef.current) return

		const LINKABLE_ELEMENTS = ["h1", "h2", "h3", "h4", "h5", "h6"]

		const linkablesRef = []
		for (let L of LINKABLE_ELEMENTS) {
			const availableLinkables = Array.from(postContentRef.current.querySelectorAll(L)).filter(el => {
				return !el.classList.contains("linkable")
			})
			linkablesRef.push(...availableLinkables)
		}

		for (let _i = 0; _i < linkablesRef.length; _i++) {
			/** @type {HTMLElement} */
			let linkableElement = linkablesRef[_i]
			const elementId = linkableElement.innerText.replaceAll(" ", "-").toLowerCase()

			linkableElement.classList.add('linkable')
			linkableElement.id = elementId

			const a = document.createElement("a")
			a.classList.add("heading-link", "reset")
			a.href = `#${elementId}`
			a.innerHTML = "#"

			a.onclick = () => {
				navigator.clipboard.writeText(a.href).err(error => {
					console.log(error)
				})
			}

			linkableElement.prepend(a)
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

	const generateShareLinks = (wantFull = false) => {
		console.log("WANTFULL", wantFull)
		const author = SITE_CONSTANTS.author

		let postLink = "";
		if (wantFull) {
			postLink = window.location.href.split("#")[0]
		}

		return [
			{
				name: "Twitter",
				url: `https://www.twitter.com/share?text=${title} by ${author}&url=${postLink}&via=${author.slice(1)}`
			},
			{
				name: "WhatsApp",
				url: `https://wa.me/?text=${title} by ${author}. Read at ${postLink}`
			}
		]
	}


	useEffect(() => {
		makeLinksExternal()
		createLinkables()

		const shareLinks = generateShareLinks(true)
		const linksContainer = document.getElementById("post-share-links")

		for (let child of linksContainer.children) {
			child.href = shareLinks.find(link => link.name === child.title).url
		}
	})

	return (
		<>
			<HeadBase title={`${title} - ${SITE_CONSTANTS.title}`} description={description} />

			<Head>
				<link defer
					rel="stylesheet"
					href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
					integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous" />
			</Head>

			<Nav />
			<main className="post-container">
				<h2 className={styles["post--title"]}>{title}</h2>

				<div className={styles["post--head"]}>
					<div className="tags-container">
						{tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
					</div>
					<div style={{ display: 'flex', flexDirection: "column", alignItems: "flex-end" }}>
						<span className={styles["post--time"]}>
							{NormalDateFormat.format(dateCreated)}
						</span>

						<span>{estReadTime} min read</span>
					</div>
				</div>

				<div ref={postContentRef} className={styles["post--content"]}>
					{hydrate(content)}
				</div>

				{/* TODO add a "give your feedback" section */}

				<div className={styles["post--share-section"]}>
					<span>Share this article on</span>

					<div id="post-share-links">
						{generateShareLinks(false).map(link => {
							return <a key={link.name} className="reset" title={link.name} href={link.url}>
								<i className={`fab fa-${link.name.toLowerCase()}`}></i>
							</a>
						})}
					</div>
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