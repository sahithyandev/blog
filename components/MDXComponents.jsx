import Link from "next/link"
import { useEffect, useState } from "react"

import TableOfContents from "./TableOfContents.MDX"

const getHeadContent = (children) => {
	if (typeof children === "string") {
		return children
	}
	return getHeadContent(children.props.children)
}

import linkableHeadStyle from "@/styles/linkable-head.module.css"

/**
 * @param {"h2" | "h3"} HeadElement
 */
const linkableHead = (HeadElement) => {
	return ({ children }) => {
		const [elementId, setElementId] = useState("");
		const [slug, setSlug] = useState("");

		useEffect(() => {
			setElementId(getHeadContent(children).replace(/\s/g, "-").toLowerCase())
			setSlug(window.location.pathname.split("/").reverse()[0])
		}, [])

		return (
			// data-is-linkable is used when creating the TableOfContents
			<HeadElement className={linkableHeadStyle["linkable"]} id={elementId} data-is-linkable>
				<Link href={{
					pathname: `/post/[slug]`,
					hash: elementId,
					query: { slug }
				}}>
					<a className={["reset", linkableHeadStyle["link-hashtag"]].join(" ")}>#</a>
				</Link>
				{children}
			</HeadElement>
		)
	}
}

export const CustomLink = (props) => {
	const HREF_PLACEHOLDERS = Object.entries({
		__YOUTUBE_CHANNEL__: "https://www.youtube.com/channel"
	})

	/** @type {string} */
	let href = props.href;
	const isInternal = href && (href.startsWith('/')) || href.startsWith("#")

	if (!href) console.info(`A link without 'href' is found\nDEBUG_NOTE ${props.children}`)

	HREF_PLACEHOLDERS.map(([placeholder, value]) => {
		href = href.replace(placeholder, value)
	})

	if (isInternal) {
		return (
			<Link href={href}>
				<a {...props} />
			</Link>
		)
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const Image = (props) => {
	if (!props.alt) console.info(`Image found with no alt\nDEBUG_NOTE ${props.src}`)
	if (!props.src) console.info(`Image found with no src\nDEBUG_NOTE ${props.alt}`)

	return <img {...props} loading="lazy" />
}

export const MDXComponents = {
	a: CustomLink,
	h2: linkableHead("h2"),
	h3: linkableHead("h3"),
	img: Image,
	TableOfContents
}