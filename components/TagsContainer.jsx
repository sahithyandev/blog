import tw from "twin.macro"
import styled from "styled-components"

const Container = tw.div`flex gap-1`;
const Tag = styled.span`
	&::before {
		content: '#';
		${tw`m-px opacity-50`}
	}
`;

export const TagsContainer = (props) => {
	const tags = props.tags || []

	return <Container>
		{tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
	</Container>
}