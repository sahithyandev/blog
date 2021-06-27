import Link from "next/link"
import { useState, useEffect } from "react"

// TODO optimise TOC
import TOCStyle from "@/styles/table-of-contents.module.css"

const TOCItem = ({ linkable, slug }) => {
	const linkText = linkable.headingText
	const hash = linkText.replace(/\s/g, "-").toLowerCase()

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

export const TableOfContents = ({ source }) => {
	const headingLines = source
		.split("\n")
		.filter(line => {
			return ["##", "###"].includes(line.split(" ")[0]);
		});

	const headingMap = ((lines) => {
		const map = [];

		/**
		 * @param {string} headingTextSource
		 */
		const removeLinks = headingTextSource => {
			const linkMatcher = /\[(\w+)\]\([\w\-\/\.:]+\)/g;

			return headingTextSource.replace(linkMatcher, (match, headingText) => headingText);
		}

		const headings = lines.map(line => {
			const [hashtags, ...content] = line.split(" ");
			const headingLevel = hashtags.length;
			const headingText = removeLinks(content.join(" "));

			return [headingLevel, headingText];
		});

		for (let heading of headings) {
			const [headingLevel, headingText] = heading;

			if (headingLevel === 2) {
				map.push({
					headingText,
					innerHeadings: []
				});
			} else if (headingLevel === 3) {
				const lastHeading = map[map.length - 1];
				lastHeading.innerHeadings.push({
					headingText,
					innerHeadings: []
				});
			}
		}

		return map;
	})(headingLines)

	const [slug, setSlug] = useState("");

	useEffect(() => {
		setSlug(window.location.pathname.split("/").reverse()[0])
	}, [])

	return (
		<section className={TOCStyle["parent-section"]}>
			<h3 className={TOCStyle["toc-heading"]}>Table Of Contents</h3>

			<ol className={TOCStyle["links-container"]}>
				{headingMap.map(linkable => {
					return <TOCItem linkable={linkable} slug={slug} key={linkable.headingText} />
				})}
			</ol>
		</section>
	)
}