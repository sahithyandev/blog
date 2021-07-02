import { SocialLinks } from "components/SocialLinks"
import Head from "next/head"

import { HeadBase, Footer, Nav, CustomLink } from "@/components"
import { SITE_CONSTANTS } from "../global"

import styles from "@/styles/about.module.css"
import postStyles from "@/styles/blog-post.module.css"

const AboutPage = () => {

	return (
		<>
			<HeadBase
				title={`About Me - ${SITE_CONSTANTS.title}`}
				description="Sahithyan, a teen web developer, and a tech enthusiast"
			/>

			<Nav />

			<main className={[styles["main"], postStyles["post--content"]].join(" ")}>
				<h1>About Me</h1>

				<p>
					Hello!, I am Sahithyan, a 17-year-old web developer, a student and a tech enthusiast. I am from Jaffna, Sri Lanka.
				</p>

				<p>
					I know HTML, CSS, JavaScript, TypeScript and some Python.
				</p>

				<h3>About the blog</h3>
				<p>
					<strong>This is a place for me to write on the things I love: Web Dev, Tech and Mathematics.</strong><br /><br />

					This blog is built using <CustomLink href="https://nextjs.org">Next.js</CustomLink> and <CustomLink href="https://mdx.js">MDX</CustomLink>. To learn more, read <CustomLink href="/post/introduction-to-my-blog">Introduction To My Blog</CustomLink>.
				</p>


				{/* TODO add my skills section */}

				<h3>Contact me</h3>
				<p>
					The fastest and the easiest way would be direct messaging me on Twitter <CustomLink href="https://www.twitter.com/sahithyandev">@sahithyandev</CustomLink>. You can also use the below-listed social media accounts too. And you can also email me at <CustomLink href="mailto:sahithyan2701@gmail.com">sahithyan2701@gmail.com</CustomLink>.
				</p>

				<div style={{ margin: 'auto', width: "fit-content" }}>
					<SocialLinks />
				</div>
			</main>

			<Footer />
		</>
	)
}

export default AboutPage;