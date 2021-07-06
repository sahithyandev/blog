import { useEffect } from "react";
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

/**
 * @param {number} n
 */
const commaFormat = (n) => (new Intl.NumberFormat()).format(n)


export const ViewCounter = ({ slug }) => {
	const { data, error } = useSWR(`/api/views/${slug}`, fetcher);

	if (error) {
		console.warn(
			`ViewCounter (view count for posts) will not work once exported as the static website. It will be fixed soon. Until then
			KEEP IT DISABLED`,
		)
	}


	const views = data?.viewCount

	useEffect(() => {
		const registerView = () => {
			fetch(`/api/views/${slug}`, {
				method: "POST"
			})
		}

		if (window.location.hostname !== "localhost") {
			// but not on dev		
			registerView()
		}
	}, [slug])

	return <span>{views ? commaFormat(views) : "---"} views</span>
}