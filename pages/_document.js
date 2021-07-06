import Document, { Html, Head, Main, NextScript } from "next/document"


// TODO make it ready to use
// Not ready to use yet
// REASON: CSS files are loaded using client-side javascript
// POSSIBLE_FIX: Inline css
class HeadProduction extends Head {
	render() {
		const { head } = this.context;
		const children = this.props.children;

		return (
			<head {...this.props}>
				{children}
				{head}
			</head>
		)
	}
}

export default class __Document extends Document {
	render() {
		const GA_MEASUREMENT_ID = "G-J8WK9DFKY6"
		const isDev = process.env.NODE_ENV === "development"

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

					<link rel="shortcut icon" type="image/png" href="/fav-me.png" />

					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

					<meta name="robots" content="follow, index" />
				</Head>

				<body>
					<Main />
					<NextScript />
					{/* {isDev ? <NextScript /> : null} */}
				</body>
			</Html>
		)
	}

}