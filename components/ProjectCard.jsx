// TODO implement this component

import styles from "../styles/project-card.module.css"

/**
 * @param {import("../pages/projects").Project} projectData 
 */
export const ProjectCard = (projectData) => {
	console.log(projectData)

	return (
		<div className={styles["project-card"]}>
			<h2 className={styles["name"]}>{projectData.name}</h2>


		</div>
	)
}