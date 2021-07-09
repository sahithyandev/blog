import tw from "twin.macro";

import { HeadBase, Footer, Nav, CustomLink, SocialLinks, MDXComponents } from "@/components"
import { SITE_CONSTANTS } from "../global"

import postStyles from "@/styles/blog-post.module.css"

const { p: Paragraph } = MDXComponents

const AboutPage = () => {

	return (
		<>
			<HeadBase
				title={`About Me - ${SITE_CONSTANTS.title}`}
				description="Sahithyan, a teen web developer, and a tech enthusiast"
			/>

			<Nav />

			<main className={postStyles["post--content"]}>
				<h1>About Me</h1>

				<Paragraph>
					Hello!, I am Sahithyan, a 17-year-old web developer, a student and a tech enthusiast. I am from Jaffna, Sri Lanka.
				</Paragraph>

				<Paragraph>
					I know HTML, CSS, JavaScript, TypeScript and some Python.
				</Paragraph>

				<h3>About the blog</h3>
				<Paragraph>
					<strong>This is a place for me to write on the things I love: Web Dev, Tech and Mathematics.</strong><br /><br />

					This blog is built using <CustomLink href="https://nextjs.org">Next.js</CustomLink> and <CustomLink href="https://mdx.js">MDX</CustomLink>. To learn more, read <CustomLink href="/post/introduction-to-my-blog">Introduction To My Blog</CustomLink>.
				</Paragraph>


				{/* TODO add my skills section */}

				<h3>Contact me</h3>
				<Paragraph>
					The fastest and the easiest way would be direct messaging me on Twitter <CustomLink href="https://www.twitter.com/sahithyandev">@sahithyandev</CustomLink>. You can also use the below-listed social media accounts too. And you can also email me at <CustomLink href="mailto:sahithyan2701@gmail.com">sahithyan2701@gmail.com</CustomLink>.
				</Paragraph>

				<div css={tw`m-auto w-min`}>
					<SocialLinks />
				</div>
			</main >

			<Footer />
		</>
	)
}

export default AboutPage;