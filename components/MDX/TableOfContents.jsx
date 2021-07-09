import tw from "twin.macro";

import Anchor from "./Anchor";

/** 
 * @typedef TOCLink_Props
 * @property {any} children
 * @property {any} linkable
 * @property {string} slug
*/

/**
 * @param {TOCLink_Props} props
 */
const TOCLink = (props) => {
	const { linkable, slug } = props;
	const linkText = linkable.headingText;

	return <li css={[tw`mt-1`]}>
		<Anchor href={{
			pathname: "/post/[slug]",
			hash: linkText.replace(/\s/g, "-").toLowerCase(),
			query: { slug }
		}}>
			{linkText}
		</Anchor>

		{props.children}
	</li>
}

/**
 * @param {TOCLink_Props} props
 */
const FirstLevelLink = (props) => {
	const { linkable, slug } = props;

	return <TOCLink {...props}>
		{linkable.innerHeadings.length === 0 ? null : (
			<ul key={linkable.headingText} css={tw`list-disc pl-5`}>
				{linkable.innerHeadings.map(innerLinkable => (
					<TOCLink
						key={innerLinkable.headingText}
						linkable={innerLinkable}
						slug={slug}
					/>
				))}
			</ul>
		)}
	</TOCLink>
}

const TableOfContents = ({ source, slug }) => {
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
		<section>
			<h3 css={[tw`mb-3`]}>Table Of Contents</h3>

			<ol css={tw`pl-9`}>
				{headingMap.map(linkable => {
					return <FirstLevelLink key={linkable.headingText} linkable={linkable} slug={slug} />
				})}
			</ol>
		</section>
	)
}

export default TableOfContents;