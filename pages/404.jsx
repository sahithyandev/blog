import { HeadBase, Nav, Footer } from "@/components"
import { SITE_CONSTANTS } from "../global"

import styles from "@/styles/not-found.module.css";

const NotFoundPage = () => {
	return (
		<div className={styles.page}>
			<HeadBase title={`NoT_foUND`} description={`Page not found - ${SITE_CONSTANTS.description}`} />

			<Nav />

			<div className={styles["page-container"]}>
				<h1 className={styles["not-found-message"]}>{"!> pAgE n0T_f0uNd"}</h1>

			</div>

			<Footer />
		</div>
	)
}

export default NotFoundPage