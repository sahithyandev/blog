import tw from "twin.macro";

import { PostCard } from "./PostCard";

export const PostsContainer = ({ posts }) => {
	return <div css={tw`flex flex-col gap-4`}>
		{posts.map(post => (
			<PostCard key={post.meta.title} {...post.meta} />
		))}
	</div>
}