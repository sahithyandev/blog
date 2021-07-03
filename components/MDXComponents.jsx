import { TableOfContents } from "./TableOfContents.MDX"
import linkableHead from "./linkableHead.MDX";
import { CustomLink } from "./CustomLink";

const Image = (props) => {
	if (!props.alt) console.info(`Image found with no alt\nDEBUG_NOTE ${props.src}`)
	if (!props.src) console.info(`Image found with no src\nDEBUG_NOTE ${props.alt}`)

	// eslint-disable-next-line jsx-a11y/alt-text
	return <img {...props} loading="lazy" />
}

import postStyles from "@/styles/blog-post.module.css"

const Note = props => {
	return <div className={postStyles["note"]} {...props} />
}

const BlockQuote = ({
	children: quote,
	citationLink = "",
	citationText = ""
}) => {
	return <figure>
		<blockquote cite={citationLink}>
			{quote}
		</blockquote>
		<figcaption>
			<cite>{citationText}</cite>
		</figcaption>
	</figure>
}

export const MDXComponents = {
	a: CustomLink,
	img: Image,
	TableOfContents,
	linkableH2: linkableHead("h2"),
	linkableH3: linkableHead("h3"),
	CustomLink,
	Note,
	BlockQuote,
}