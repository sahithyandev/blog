import { SocialLinks } from "components/SocialLinks"
import Head from "next/head"

import { HeadBase, Footer, Nav } from "@/components"
import { SITE_CONSTANTS } from "../global"

import styles from "@/styles/about.module.css"
import postStyles from "@/styles/blog-post.module.css"

const AboutPage = () => {
	return (
		<>
			<HeadBase
				title={`About Me - ${SITE_CONSTANTS.title}`}
				description="Sahithyan, a teen web developer, and a tech enthusiast who likes Mathematics"
			/>

			<Head>
				<link
					defer
					rel="stylesheet"
					href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
					integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous" />
			</Head>

			<Nav />

			<main className={[styles["main"], postStyles["post--content"]].join(" ")}>
				<h1>I am</h1>

				<p>
					Hello!, I am Sahithyan, a 17-year-old web developer, a student and a tech enthusiast. I am from Jaffna, Sri Lanka. I like to code in JavaScript and TypeScript. And as a front end developer, I also know HTML & CSS. I learnt Python and Go too (But I don't use them currently).
				</p>

				<h3>About the blog</h3>
				<p>
					This is a place for me to write on the things I love: Web Dev, Tech and Mathematics.
				</p>

				{/* TODO add my skills section */}

				<h3>Contact me</h3>
				<p>
					The fastest and the easiest way would be direct messaging me on Twitter <a href="https://www.twitter.com/iamSahithyan">@iamSahithyan</a>. You can also email me at <a className="formatted" href="mailto:sahithyan2701@gmail.com">sahithyan2701@gmail.com</a>
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