import Document, { Html, Head, Main, NextScript } from "next/document"

export default class __Document extends Document {

	render() {
		const GA_MEASUREMENT_ID = "G-J8WK9DFKY6"

		return (
			<Html lang="en">
				<Head>
					{/* Global site tag (gtag.js) - Google Analytics */}
					<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
					<script
						dangerouslySetInnerHTML={{
							__html: `
								if (window.location.host !== "localhost") {
									window.dataLayer = window.dataLayer || [];
									function gtag(){dataLayer.push(arguments);}
									gtag('js', new Date());
									
									gtag('config', '${GA_MEASUREMENT_ID}');
								}`
						}}
					>
					</script>

					<link rel="icon" href="/fav-me.png" />

					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

					<meta name="robots" content="follow, index" />
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}

}