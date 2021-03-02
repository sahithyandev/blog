import { Footer, HeadBase, Nav } from "../components"
import { SITE_CONSTANTS } from "../global"

import styles from "../styles/not-found.module.css";

const NotFoundPage = () => {
	return (
		<div className={styles.page}>
			<HeadBase title={`NoT_foUND`} description={"Page not found"} />
			<div className={styles["page-container"]}>
				<div className={styles["error-404"]}>
					404040404040<span className={styles["error-404-special"]}>404</span>040404040404
				</div>

				<h1 className={styles["not-found-message"]}>Page Not Found</h1>

			</div>

			<div className={styles.footer}>
				<Footer />
			</div>
		</div>
	)
}

export default NotFoundPage