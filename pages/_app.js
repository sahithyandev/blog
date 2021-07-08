import Head from "next/head"

import { Page } from "@/components"
import { GlobalStyles } from "@/components/GlobalStyles";

function MyApp({ Component, pageProps }) {
  return <>
    <GlobalStyles />
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

    </Head>
    <Page>
      <Component {...pageProps} />
    </Page>
  </>
}

export default MyApp
