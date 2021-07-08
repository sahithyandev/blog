import postStyles from "@/styles/blog-post.module.css"

const Note = props => {
	return <div className={postStyles["note"]} {...props} />
}

export default Note;