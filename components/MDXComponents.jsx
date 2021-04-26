import Link from "next/link";
import { useEffect, useState } from "react";

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

// TODO move TOC into a seperate file
import TOCStyle from "@/styles/table-of-contents.module.css"

const TOCItem = ({ linkable, slug }) => {
	const linkText = linkable.headingText
	const hash = linkText.replaceAll(" ", "-").toLowerCase()

	return <li key={linkText}>
		<Link href={{
			pathname: `/post/[slug]`,
			hash,
			query: { slug }
		}}>
			<a className={TOCStyle["toc-link"]}>{linkText}</a>

		</Link>
		{linkable.innerHeadings.length === 0 ? null : (linkable.innerHeadings.map(innerLinkable => {
			return <ul key={linkable.headingText}>
				<TOCItem linkable={innerLinkable} slug={slug} />
			</ul>
		})
		)}
	</li>
}

const TableOfContents = () => {
	const [linkableElements, setLinkableElements] = useState([]);
	const [slug, setSlug] = useState("");

	// TODO rewrite the createHeadingMap function in a optimal way
	/**
	 * @param {HTMLElement[]} headings 
	 */
	const createHeadingMap = (headings) => {
		let m = [];

		for (let heading of headings) {
			const tagName = heading.tagName.toLowerCase();
			if (tagName === "h2") {
				m.push({
					headingText: heading.innerText.slice(1),
					innerHeadings: []
				})
			} else if (tagName === "h3") {
				const lastHeading = m[m.length - 1]
				lastHeading.innerHeadings.push({
					headingText: heading.innerText.slice(1),
					innerHeadings: []
				})
			}
		}

		return m;
	}

	useEffect(() => {
		// data-is-linkable=true elements will be shown in the TableOfContents
		const C = Array.from(document.querySelectorAll("*[data-is-linkable=true]"));
		setLinkableElements(createHeadingMap(C))

		setSlug(window.location.pathname.split("/").reverse()[0])
	}, [])

	if (linkableElements.length === 0) return <div style={{ height: 80 }}></div>

	return (
		<section className={TOCStyle["parent-section"]}>
			<h3 className={TOCStyle["toc-heading"]}>Table Of Contents</h3>

			<ol className={TOCStyle["links-container"]}>
				{linkableElements.map(linkable => {
					return <TOCItem linkable={linkable} slug={slug} key={linkable.headingText} />
				})}
			</ol>
		</section>
	)
}

export const CustomLink = (props) => {
	/** @type {string} */
	const href = props.href;
	const isInternal = href && (href.startsWith('/')) || href.startsWith("#")

	if (isInternal) {
		return (
			<Link href={href}>
				<a {...props} />
			</Link>
		)
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export const MDXComponents = {
	a: CustomLink,
	h2: linkableHead("h2"),
	h3: linkableHead("h3"),
	// h3: LinkableH3,
	TableOfContents
}