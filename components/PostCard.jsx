import Link from "next/link"

import { NormalDateFormat } from "../helpers/other"

import styles from "../styles/post-card.module.css"

export const PostCard = (postData) => {
	return (
		<Link href={`/post/${postData.slug}`}>
			<a className="reset">
				<div className={styles["post-card"]}>
					<h3 className={styles["title"]}>{postData.title}</h3>
					<p className={styles["description"]}>{postData.description}</p>
					
					<div className={styles["meta"]}>
						<span className={styles["post-created-time"]}>{NormalDateFormat.format(postData.dateCreated)}</span>
						<div className="tags-container">
							{postData.tags.map(tag => <span className="tag">{tag}</span>)}
						</div>
					</div>
				</div>
			</a>
		</Link>
	)
}