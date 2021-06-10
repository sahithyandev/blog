import Link from "next/link"
import { useEffect, useState } from "react"

const getHeadContent = (children) => {
	if (typeof children === "string") {
		return children
	}
	if (Array.isArray(children)) {
		return children.map((child) => getHeadContent(child)).join("")
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

export default linkableHead