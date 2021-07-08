import tw from "twin.macro";

import { HeadBase, Nav, Footer, PostCard, SocialLinks, PostsContainer } from '@/components'
import { getAllPosts } from "@/helpers/post"

export default function Home({ latestPosts }) {
  return (
    <>
      <HeadBase />

      <Nav hideLogo={true} />

      <main>
        <div css={tw`flex flex-col items-center mt-12 mb-16`}>
          <h1 css={tw`font-bold mb-2 text-3xl`}>Sahithyan</h1>
          <div css={tw`opacity-80 text-lg`}>student, web developer & tech enthusiast</div>

          <SocialLinks />
        </div>


        <section>
          <h2 css={tw`text-xl`}>Latest Posts</h2>

          <PostsContainer posts={latestPosts} />
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