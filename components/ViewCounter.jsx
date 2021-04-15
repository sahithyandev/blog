import { useEffect } from "react";
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

/**
 * @param {number} n
 */
const commaFormat = (n) => (new Intl.NumberFormat()).format(n)

export const ViewCounter = ({ slug }) => {
	const { data } = useSWR(`/api/views/${slug}`, fetcher);
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