import { HeadBase, Footer, Nav } from "../components"
import { SITE_CONSTANTS } from "../global"

import styles from "../styles/about.module.css"

const AboutPage = () => {
	return (
		<>
			<HeadBase
				title={`About Me - ${SITE_CONSTANTS.title}`}
				description="Sahithyan, a teen web developer, and a tech enthusiast who likes Mathematics"
			/>

			<Nav />

			<main className={styles["main"]}>
				<h1>I... am...</h1>

				<p>
					Hello!, I am Sahithyan, a 17-year-old web developer, a student and a tech enthusiast. I am from Jaffna, Sri Lanka.
				</p>

				<h3>About the blog</h3>
				<p>
					This is a place for me to write about all the things I love: Web Dev, Tech and Mathematics.
				</p>

				<h3>Contact me</h3>
				<p>
					The fastest and the easiest way would be direct messaging me on Twitter <a href="https://www.twitter.com/iamSahithyan">@iamSahithyan</a>. You can also email me at <a className="formatted" href="mailto:sahithyan2701@gmail.com">sahithyan2701@gmail.com</a>
				</p>
			</main>

			<Footer />
		</>
	)
}

export default AboutPage;