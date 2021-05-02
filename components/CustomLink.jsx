import Link from "next/link"

export const CustomLink = (props) => {
	const HREF_PLACEHOLDERS = Object.entries({
		__YOUTUBE_CHANNEL__: "https://www.youtube.com/channel"
	})

	/** @type {string} */
	let href = props.href;
	const isInternal = href && (href.startsWith('/')) || href.startsWith("#")

	if (!href) console.info(`A link without 'href' is found\nDEBUG_NOTE ${props.children}`)

	HREF_PLACEHOLDERS.map(([placeholder, value]) => {
		href = href.replace(placeholder, value)
	})

	if (isInternal) {
		return (
			<Link href={href}>
				<a {...props} />
			</Link>
		)
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />
}
