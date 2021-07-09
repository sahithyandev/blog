import tw, { css } from "twin.macro";

const BlockQuote = ({
	children: quote,
	citationLink = "",
	citationText = ""
}) => {
	return <figure css={tw`ml-0 max-w-prose`}>
		<blockquote
			cite={citationLink}
			css={tw`ml-4`}
		>
			{quote}
		</blockquote>
		<figcaption css={css`
			:before {
				content: "— ";
			}
			${tw`text-right`}
		`}>
			<cite>{citationText}</cite>
		</figcaption>
	</figure>
}

export default BlockQuote;