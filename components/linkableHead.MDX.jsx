import Link from "next/link"
import tw from "twin.macro";
import styled from "styled-components";

const getHeadContent = (children) => {
	if (typeof children === "string") {
		return children
	}
	if (Array.isArray(children)) {
		return children.map((child) => getHeadContent(child)).join("")
	}
	return getHeadContent(children.props.children)
}

const HeadElement = styled.h2`
		${tw`mb-6 sm:relative`}
		
		@media (min-width: 640px) {
			left: -24px;
		}
	`;

const LinkHashtag = styled.a`
	${tw`font-medium font-mono opacity-60 mr-2 hover:opacity-80`}
	font-size: 1.1em;
`;

/**
 * @param {"h2" | "h3"} headElementTagName
 */
const linkableHead = (headElementTagName) => {
	// eslint-disable-next-line react/display-name
	return ({ children, slug }) => {
		const elementId = getHeadContent(children).replace(/\s/g, "-").toLowerCase()

		return (
			<HeadElement id={elementId} as={headElementTagName}>
				{slug === undefined ? null :
					<Link passHref={true} href={{
						pathname: `/post/[slug]`,
						hash: elementId,
						query: { slug }
					}}>
						<LinkHashtag className="reset">#</LinkHashtag>
					</Link>
				}
				<span>
					{children}
				</span>
			</HeadElement>
		)
	}
}

export default linkableHead