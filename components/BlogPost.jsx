import Head from "next/head"
import { createRef, useEffect } from "react"

import { Nav } from "./Nav"
import { HeadBase } from "./HeadBase"
import { ViewCounter } from "./ViewCounter"
import { Footer } from "./Footer"
import { SITE_CONSTANTS } from "../global"
import { NormalDateFormat } from "../helpers/other"

import styles from "../styles/post.module.css"

const PRISM_THEME_URL = "https://unpkg.com/prismjs@1.23.0/themes/prism-twilight.css"

export const BlogPost = (props) => {
	const { meta, children } = props;
	const { title, description, slug, tags, estReadTime, dateCreated } = meta;

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
				{/* For icons */}
				<link defer
					rel="stylesheet"
					href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
					integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous" />

				{/* Fpr syntax highlighting */}
				<link rel="stylesheet" href={PRISM_THEME_URL} />
			</Head>

			<Nav />
			<main className="post-container">
				<h2 className={styles["post--title"]}>{title}</h2>

				<div className={styles["post--head"]}>
					<div>

						<span className={styles["post--time"]}>
							{NormalDateFormat.format(dateCreated)}
						</span>
						<div className="tags-container">
							{tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
						</div>
					</div>

					<div style={{ display: 'flex', gap: 6 }}>
						<span>{estReadTime} min read</span>
						|
						<ViewCounter slug={slug} />
					</div>
				</div>


				<div
					ref={postContentRef}
					className={styles["post--content"]}
				>
					<article>
						{children}
					</article>
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