import Link from "next/link"
import { useState, useEffect } from "react"

// TODO optimise TOC
import TOCStyle from "@/styles/table-of-contents.module.css"

/**
 * @param {HTMLElement} headingElement
 */
const getHeadingText = headingElement => {
	return Array.from(headingElement.children).find(child => {
		return child.classList.contains("linkable--heading-text")
	}).innerText
}

const TOCItem = ({ linkable, slug }) => {
	const linkText = linkable.headingText
	const hash = linkText.replaceAll(" ", "-").toLowerCase()

	return <li>
		<Link href={{
			pathname: `/post/[slug]`,
			hash,
			query: { slug }
		}}>
			<a className={TOCStyle["toc-link"]}>{linkText}</a>
		</Link>

		{/* Show the next-level headings if present */}
		{linkable.innerHeadings.length === 0 ? null : (
			<ul key={linkable.headingText}>
				{linkable.innerHeadings.map(innerLinkable => <TOCItem
					key={innerLinkable.headingText}
					linkable={innerLinkable}
					slug={slug}
				/>
				)}
			</ul>
		)}
	</li>
}

export const TableOfContents = () => {
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
					headingText: getHeadingText(heading),
					innerHeadings: []
				})
			} else if (tagName === "h3") {
				const lastHeading = m[m.length - 1]
				lastHeading.innerHeadings.push({
					headingText: getHeadingText(heading),
					innerHeadings: []
				})
			}
		}

		return m;
	}

	useEffect(() => {
		// data-is-linkable=true elements will be shown in the TableOfContents
		const headingMap = createHeadingMap(Array.from(document.querySelectorAll("*[data-is-linkable=true]")));
		setLinkableElements(headingMap)

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