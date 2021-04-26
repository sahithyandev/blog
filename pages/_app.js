import Head from "next/head"

import '@/styles/globals.css'
import "@/styles/nav.component.css";
import "@/styles/footer.component.css";

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <meta httpEquiv="refresh" content="30 " /> */}

    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
