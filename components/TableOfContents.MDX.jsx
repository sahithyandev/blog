import Link from "next/link";

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

export const TableOfContents = ({ source, slug }) => {
	const actualHeadingContent = (_content) => {
		return _content
			// remove spaces and line breaks
			.replace(/[\n\t]/g, "")
			// remove attributes	
			.replace(/\s\w+=\".*?\"/g, "")
			// remove tags
			.replace(/<(\w+)>(.*?)<\/\1>/g, "$2")
			// change jsx spaces to normal
			.replace(/\{\" \"\}/g, " ")
			// remove extra spaces
			.split(" ")
			.filter(word => word !== "")
			.join(" ")
	}

	const headingObjArr = [...source.matchAll(/<(linkableH(?<headingLevel>\d))[^>]*>(?<_content>.*?)<\/\1>/gs)]
		.map(headingMatch => {
			const { headingLevel, _content } = headingMatch.groups

			return {
				headingLevel: parseInt(headingLevel),
				headingText: actualHeadingContent(_content)
			}
		})

	const headingMap = ((headingObjArr) => {
		const map = []

		for (let headingObj of headingObjArr) {
			const { headingLevel, headingText } = headingObj;

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

		return map
	})(headingObjArr)

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