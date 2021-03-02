import { HeadBase, Nav, Footer, PostCard } from "../components"
import { getAllPosts } from "../helpers/post"
import { SITE_CONSTANTS } from "../global"

const PostsPage = ({ posts }) => {
	return (
		<>
			<HeadBase title={`Posts - ${SITE_CONSTANTS.title}`} />

			<Nav />

			<main>
				<h2>Posts</h2>

				<p>Here are all of my posts.</p>

				<div className="posts-container">
					{posts.map(_post => <PostCard key={_post.title} {..._post} />)}
				</div>
			</main>

			<Footer />
		</>
	)
}

export async function getServerSideProps(context) {
	return {
		props: {
			posts: getAllPosts()
		}
	}
}


export default PostsPage