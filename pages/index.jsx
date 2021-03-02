import { HeadBase, Nav, Footer, PostCard } from '../components'
import { getAllPosts } from "../helpers/post"

import styles from '../styles/home.module.css'

export default function Home({ latestPosts }) {
  return (
    <>
      <HeadBase />

      <Nav showLogo={false} />

      <main>
        <div className={styles["me-banner"]}>
          <div className={styles["banner--name"]}>Sahithyan</div>
          <div className={styles["small-intro"]}>lorem ipsum dolor sit amet</div>
        </div>


        <section>
          <h2>Latest Posts</h2>

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
      latestPosts: getAllPosts().slice(0, 5)
    }
  }
}