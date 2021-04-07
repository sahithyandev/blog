import Head from "next/head"

import { HeadBase, Nav, Footer, PostCard } from '../components'
import { getAllPosts } from "../helpers/post"

import styles from '../styles/home.module.css'

export default function Home({ latestPosts }) {
  const socialMediaLinks = Object.entries({
    "twitter": "https://www.twitter.com/iamSahithyan",
    "instagram": "https://www.instagram.com/sahithyan_"
  })

  return (
    <>
      <HeadBase />

      <Head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous" />
      </Head>

      <Nav showLogo={false} />

      <main>
        <div className={styles["me-banner"]}>
          <div className={styles["banner--name"]}>Sahithyan</div>
          <div className={styles["small-intro"]}>student, web developer & tech enthusiast</div>

          <div className={styles["social-media-icons-container"]}>
            {socialMediaLinks.map(s => {
              return <a className="reset" href={s[1]} key={s[0]}>
                <i className={`fab fa-${s[0]}`}></i>
              </a>
            })}
          </div>
        </div>


        <section>
          <h2 className={styles["latest-posts-heading"]}>Latest Posts</h2>

          <div className="posts-container">
            {latestPosts.map(post => <PostCard key={post.title} {...post} />)}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      latestPosts: getAllPosts().slice(0, 4)
    }
  }
}