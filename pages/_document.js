import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

// TODO decide if its worth using
class HeadProduction extends Head {
	render() {
		const { head, styles } = this.context;
		const children = this.props.children;

		return (
			<head {...this.props}>
				{children}
				{head}
				{styles}
			</head>
		)
	}
}

export default class __Document extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () => {
				return originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
				})
			}
			const initialProps = await Document.getInitialProps(ctx)

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			}
		} finally {
			sheet.seal()
		}
	}

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