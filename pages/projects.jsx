// TODO Implement this page

import { HeadBase, Nav, ProjectCard, Footer } from "../components"
import { SITE_CONSTANTS } from "../global";

/**
 * @typedef Project
 * @property {String} name
 * @property {String} description
 */

// TODO add all my projects here
/** @type Project[] */
const PROJECTS = [
	{ name: "Sahithyan", description: "loremm" }
]

const ProjectsPage = () => {
	return (
		<>
			<HeadBase title={`Projects - ${SITE_CONSTANTS.title}`} />
			<Nav />

			<main>
				<h2>Projects</h2>

				<div className="projects-container">
					{PROJECTS.map(project => <ProjectCard key={project.name} {...project} />)}
				</div>
			</main>

			<Footer />

		</>
	)

}

export default ProjectsPage;