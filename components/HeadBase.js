import Head from 'next/head'

import { SITE_CONSTANTS } from "../global"

export const HeadBase = ({ title, description }) => {
	title = title || SITE_CONSTANTS.title
	description = description || SITE_CONSTANTS.description

	return (
		<>
			<Head>
				<title key="browser-title">{title}</title>
				<meta name="escription" content={description} />
				<link rel="icon" href="/fav-me.png" />

				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<meta name="twitter:title" value={title} />
				<meta name="twitter:card" value="summary" />
				<meta name="twitter:description" value={description} />
				<meta name="twitter:site" value={SITE_CONSTANTS.author} />
				<meta name="twitter:creator" value={SITE_CONSTANTS.author} />

				{/* TODO */}
				<meta key="og-description" property="og:description" content={description} />
				<meta key="og-title" property="og:title" content={title} />
				<meta key="og-url" property="og:url" content="sahithyan.com" />
				{/*  */}

			</Head>
		</>
	)
}