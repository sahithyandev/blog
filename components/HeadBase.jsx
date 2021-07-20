import Head from "next/head"

import { SITE_CONSTANTS } from "../global"

export const HeadBase = ({ title, description }) => {
	title = title || SITE_CONSTANTS.title
	description = description || SITE_CONSTANTS.description
	const siteName = "Sahithyan's Blog"

	return (
		<>
			<Head>
				<title key="browser-title">{title}</title>
				<meta name="description" content={description} />
				<link rel="alternate" href={SITE_CONSTANTS.rss_feed_url} type="application/rss+xml" title="RSS feed" />
				<link rel="canonical" href={SITE_CONSTANTS.website_url} />

				{/* For Twitter */}
				<meta name="twitter:title" value={title} />
				<meta name="twitter:card" value="summary_large_image" />
				<meta name="twitter:description" value={description} />
				<meta name="twitter:creator" value={SITE_CONSTANTS.author} />

				{/* For Open Graph */}
				<meta key="og-description" property="og:description" content={description} />
				<meta key="og-title" property="og:title" content={title} />
				<meta key="og-url" property="og:url" content="sahithyandev.github.io" />
				<meta key="og-site-name" property="og:site_name" content={siteName} />
				<meta key="og-image" property="og:image" content="https://sahithyandev.github.io/og-image-base.png" />
				<meta key="og-image--alt" property="og:image:alt" content="Sahithyan's official profile picture" />
			</Head>
		</>
	)
}
