import Link from "next/link"

import { NormalDateFormat } from "../helpers/other"

import styles from "../styles/post-card.module.css"

export const PostCard = (postMeta) => {
	const { slug, title, description, dateCreated, tags } = postMeta


	return (
		<Link href={`/post/${slug}`}>
			<a className="reset">
				<div className={styles["post-card"]}>
					<h3 className={styles["title"]}>{title}</h3>
					<p className={styles["description"]}>{description}</p>

					<div className={styles["meta"]}>
						<span className={styles["post-created-time"]}>{NormalDateFormat.format(dateCreated)}</span>
						<div className="tags-container">
							{tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
						</div>
					</div>
				</div>
			</a>
		</Link >
	)
}