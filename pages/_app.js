import Head from "next/head"

import { Page } from "@/components"
import { GlobalStyles } from "@/components/GlobalStyles";

import '@/styles/fonts.css';
import '@/styles/globals.css';
import "@/styles/nav.component.css";
import "@/styles/footer.component.css";

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
