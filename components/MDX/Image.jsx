import tw from "twin.macro";

const Image = (props) => {
	if (!props.alt) console.info(`Image found with no alt\nDEBUG_NOTE ${props.src}`)
	if (!props.src) console.info(`Image found with no src\nDEBUG_NOTE ${props.alt}`)

	// eslint-disable-next-line jsx-a11y/alt-text
	return <img {...props} loading="lazy"
		css={tw`block my-0 mx-auto max-w-full max-h-mdxImage`}
	/>
}

export default Image;