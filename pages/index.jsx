import Head from "next/head"

import { HeadBase, Nav, Footer, PostCard } from '../components'
import { getAllPosts } from "../helpers/post"

import styles from '../styles/home.module.css'

export default function Home({ latestPosts }) {
  const createSocialMediaLinkObj = (dataArr) => {
    /**
     * @type {string}
     */
    const [providerName, link, __icon] = dataArr;

    return {
      providerName, link,
      icon: __icon || providerName.toLowerCase(),
      id: link.split("/").reverse()[0]
    }
  }

  const updatedSocialMedia = [
    // ["providerName", "profileLink", "<optional>iconName"]
    ["Twitter", "https://www.twitter.com/iamSahithyan"],
    ["Instagram", "https://www.instagram.com/sahithyan_"],
    ["GitHub", "https://www.github.com/sahithyandev"],
    ["Telegram", "https://www.t.me/sahithyan", "telegram-plane"],
  ].map(createSocialMediaLinkObj)

  return (
    <>
      <HeadBase />

      <Head>
        <link
          defer
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
          integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous" />
      </Head>

      <Nav showLogo={false} />

      <main>
        <div className={styles["me-banner"]}>
          <div className={styles["banner--name"]}>Sahithyan</div>
          <div className={styles["small-intro"]}>student, web developer & tech enthusiast</div>

          <div className={styles["social-media-icons-container"]}>
            {updatedSocialMedia.map(s => {
              return (
                <a className="reset" href={s.link} key={s.providerName} title={`${s.providerName} (${s.id})`}>
                  <i className={`fab fa-${s.icon}`}></i>
                </a>
              )
            })}
          </div>
        </div>


        <section>
          <h2 className={styles["latest-posts-heading"]}>Latest Posts</h2>

          <div className="posts-container">
            {latestPosts.map(post => <PostCard key={post.meta.title} {...post.meta} />)}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      latestPosts: getAllPosts().slice(0, 4)
    }
  }
}