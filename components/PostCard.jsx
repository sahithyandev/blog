import Link from "next/link"

import { TagsContainer } from "./TagsContainer"
import { NormalDateFormat } from "@/helpers/other"

import styles from "@/styles/post-card.module.css"

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
						<TagsContainer tags={tags} />
					</div>
				</div>
			</a>
		</Link >
	)
}