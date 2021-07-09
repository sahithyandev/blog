import Head from "next/head"
import tw from "twin.macro"

import Anchor from "./MDX/Anchor"
import { Nav } from "./Nav"
import { HeadBase } from "./HeadBase"
import { ViewCounter } from "./ViewCounter"
import { CustomLink } from "./CustomLink"
import { Footer } from "./Footer"
import { TagsContainer } from "./TagsContainer"
import { SITE_CONSTANTS } from "../global"
import { NormalDateFormat } from "@/helpers/other"

import { TwitterIcon } from "@/assets/icons"

const PRISM_THEME_URL = "https://unpkg.com/prismjs@1.23.0/themes/prism-twilight.css"

export const BlogPost = (props) => {
	const { meta, children } = props;
	const { title, description, slug, tags, estReadTime, dateCreated } = meta;
	const postLink = `https://sahithyandev.github.io/post/${slug}`;

	const shareLinks = (() => {
		const author = SITE_CONSTANTS.author

		return [
			{
				name: "Twitter",
				url: `https://www.twitter.com/share?text=${title} by ${author}&url=${postLink}}`,
				icon: TwitterIcon
			}
		].map(_ => {
			_.url = encodeURI(_.url)

			return _
		})
	})()

	return (
		<>
			<HeadBase title={`${title} - ${SITE_CONSTANTS.title}`} description={description} />

			<Head>
				{/* Fpr syntax highlighting */}
				<link rel="stylesheet" href={PRISM_THEME_URL} />
			</Head>

			<Nav />
			<main>
				<h1 css={tw`text-2xl mb-1 mt-8`}>{title}</h1>

				<div css={tw`flex justify-between text-sm opacity-90`}>

					<span>
						{NormalDateFormat.format(dateCreated)}
					</span>

					<div css={tw`flex flex-col gap-1 items-end`}>
						<span>{estReadTime} min read</span>

						<TagsContainer tags={tags} />
						{/* <ViewCounter slug={slug} /> */}
					</div>
				</div>

				<div css={tw`my-8`}>
					<article>
						{children}
					</article>
				</div>
			</main>

			<div css={tw`flex flex-col sm:flex-row justify-between text-sm gap-2 sm:gap-0`}>
				<div>
					<Anchor href={encodeURI(`https://twitter.com/search?q=${postLink}`)}>
						Discuss On Twitter
					</Anchor>
				</div>

				<div css={tw`flex items-center justify-between sm:justify-start`}>
					<span css={tw`opacity-70 mr-2`}>Share this article on</span>

					<div>
						{shareLinks.map(link => {
							return <CustomLink href={link.url} key={link.name} title={link.name}>
								<link.icon width="20" height="20" />
							</CustomLink>
						})}
					</div>
				</div>
			</div>

			<Footer />
		</>
	)

}