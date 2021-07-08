const BlockQuote = ({
	children: quote,
	citationLink = "",
	citationText = ""
}) => {
	return <figure>
		<blockquote cite={citationLink}>
			{quote}
		</blockquote>
		<figcaption>
			<cite>{citationText}</cite>
		</figcaption>
	</figure>
}

export default BlockQuote;