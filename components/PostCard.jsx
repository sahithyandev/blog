import Link from "next/link"
import tw from "twin.macro"
import styled from "styled-components"

import { TagsContainer } from "./TagsContainer"
import { NormalDateFormat } from "@/helpers/other"

const PostCardContainer = styled.a`
	--post-created-time-opacity: 0;
	--card-bg: var(--post-card-bg);
	
	:focus {
		--card-bg: var(--post-card-bg-hover);
		--post-created-time-opacity: .8;
	}
`;

const PostCardContainerDiv = styled.div`
	${tw`py-3 px-4 rounded`}
	transition: all .3s;
	background-color: var(--card-bg);
	
	:hover {
		--post-created-time-opacity: .9;
		--card-bg: var(--post-card-bg-hover);
	}
`;

const PostCreatedTime = styled.span`
	${tw`text-sm transition-opacity`}
	opacity: var(--post-created-time-opacity);
`;

export const PostCard = (postMeta) => {
	const { slug, title, description, dateCreated, tags } = postMeta

	return (
		<Link href={`/post/${slug}`} passHref={true}>
			<PostCardContainer className="reset">
				<PostCardContainerDiv>
					<h3 css={tw`mt-0 mb-2`}>{title}</h3>
					<p css={tw`text-sm mb-2`}>{description}</p>

					<div css={tw`flex justify-between`}>
						<PostCreatedTime>
							{NormalDateFormat.format(dateCreated)}
						</PostCreatedTime>
						<TagsContainer tags={tags} />
					</div>
				</PostCardContainerDiv>
			</PostCardContainer>
		</Link>
	)
}