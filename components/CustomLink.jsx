import Link from "next/link"

export const CustomLink = (props) => {
	const HREF_PLACEHOLDERS = Object.entries({
		__YOUTUBE_CHANNEL__: "https://www.youtube.com/channel"
	})

	let href = props.href;

	if (!href) console.info(`A link without 'href' is found\nDEBUG_NOTE ${props.children}`)

	let isInternal = false;

	if (typeof href === "string") {
		isInternal = href.startsWith('/') || href.startsWith("#")

		HREF_PLACEHOLDERS.map(([placeholder, value]) => {
			href = href.replace(placeholder, value)
		})

	} else if (typeof href === "object") {
		isInternal = true
	}

	if (isInternal) {
		return (
			<Link href={href}>
				<a {...props} />
			</Link>
		)
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />
}
