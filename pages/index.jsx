import Head from "next/head"

import { HeadBase, Nav, Footer, PostCard, SocialLinks } from '@/components'
import { getAllPosts } from "@/helpers/post"

import styles from '@/styles/home.module.css'

export default function Home({ latestPosts }) {
  return (
    <>
      <HeadBase />

      <Nav hideLogo={true} />

      <main>
        <div className={styles["me-banner"]}>
          <h1 className={styles["banner--name"]}>Sahithyan</h1>
          <div className={styles["small-intro"]}>student, web developer & tech enthusiast</div>

          <SocialLinks />
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
      latestPosts: (await getAllPosts()).slice(0, 4)
    }
  }
}