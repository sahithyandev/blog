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
	// eslint-disable-next-line react/display-name
	return ({ children, slug }) => {
		const elementId = getHeadContent(children).replace(/\s/g, "-").toLowerCase()

		return (
			<HeadElement className={linkableHeadStyle["linkable"]} id={elementId}>
				{slug === undefined ? null :
					<Link href={{
						pathname: `/post/[slug]`,
						hash: elementId,
						query: { slug }
					}}>
						<a className={["reset", linkableHeadStyle["link-hashtag"]].join(" ")}>#</a>
					</Link>
				}
				<span className="linkable--heading-text">
					{children}
				</span>
			</HeadElement>
		)
	}
}

export default linkableHead