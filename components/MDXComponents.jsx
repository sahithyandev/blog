
import { TableOfContents } from "./TableOfContents.MDX"
import linkableHead from "./linkableHead.MDX";
import { CustomLink } from "./CustomLink";

const Image = (props) => {
	if (!props.alt) console.info(`Image found with no alt\nDEBUG_NOTE ${props.src}`)
	if (!props.src) console.info(`Image found with no src\nDEBUG_NOTE ${props.alt}`)

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

// TODO add a component for <blockquote>

export const MDXComponents = {
	a: CustomLink,
	h2: linkableHead("h2"),
	h3: linkableHead("h3"),
	img: Image,
	TableOfContents,
	Note,
	BlockQuote,
}