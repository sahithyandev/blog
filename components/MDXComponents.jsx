import Link from "next/link";

import customLinkStyle from "../styles/custom-link.module.css"

const CustomLink = (props) => {
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

	return <a class={customLinkStyle["external"]} target="_blank" rel="noopener noreferrer" {...props} />
}

export const MDXComponents = {
	a: CustomLink
}