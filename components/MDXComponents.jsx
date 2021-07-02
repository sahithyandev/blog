import ImageBase from "next/image";

import { TableOfContents } from "./TableOfContents.MDX"
import linkableHead from "./linkableHead.MDX";
import { CustomLink } from "./CustomLink";

import postStyles from "@/styles/blog-post.module.css"

const Image = props => {
	return <div className={postStyles["img-container"]}>
		<ImageBase {...props} />
	</div>
}

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
	h2: linkableHead("h2"),
	h3: linkableHead("h3"),
	TableOfContents,
	Note,
	BlockQuote,
	Image
}