import Head from "next/head"
import { useEffect, useState } from "react"

import { Nav } from "./Nav"
import { HeadBase } from "./HeadBase"
import { ViewCounter } from "./ViewCounter"
import { Footer } from "./Footer"
import { CustomLink } from "./CustomLink"
import { SITE_CONSTANTS } from "../global"
import { NormalDateFormat } from "@/helpers/other"

import styles from "@/styles/blog-post.module.css"

const PRISM_THEME_URL = "https://unpkg.com/prismjs@1.23.0/themes/prism-twilight.css"

export const BlogPost = (props) => {
	const { meta, children } = props;
	const { title, description, slug, tags, estReadTime, dateCreated } = meta;
	const [postLink, setPostLink] = useState("")

	const generateShareLinks = () => {
		const author = SITE_CONSTANTS.author

		return [
			{
				name: "Twitter",
				url: `https://www.twitter.com/share?text=${title} by ${author}&url=${postLink}}`
			},
			{
				name: "WhatsApp",
				url: `https://wa.me/?text=${title} by ${author}. Read at ${postLink}`
			}
		].map(_ => {
			_.url = encodeURI(_.url)

			return _
		})
	}

	useEffect(() => {
		setPostLink(window.location.href)
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

					<span className={styles["post--time"]}>
						{NormalDateFormat.format(dateCreated)}
					</span>

					<div style={{ display: 'flex', gap: 4, flexDirection: 'column', alignItems: 'flex-end' }}>
						<span>{estReadTime} min read</span>

						<div className="tags-container">
							{tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
						</div>
						{/* <ViewCounter slug={slug} /> */}
					</div>
				</div>

				<div className={styles["post--content"]} >
					<article>
						{children}
					</article>
				</div>
			</main>

			<div className={styles["post--bottom-bar"]}>
				<div>
					<CustomLink href={encodeURI(`https://twitter.com/search?q=${postLink}`)} className={styles["post--content-a"]}>
						Discuss On Twitter
					</CustomLink>
				</div>

				<div className={styles["post--share-section"]}>
					<span>Share this article on</span>

					<div>
						{generateShareLinks().map(link => {
							return <CustomLink href={link.url} key={link.name} title={link.name} className="reset">
								<i className={`fab fa-${link.name.toLowerCase()}`}></i>
							</CustomLink>
						})}
					</div>
				</div>
			</div>

			<Footer />
		</>
	)

}