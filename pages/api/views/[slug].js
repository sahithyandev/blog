import db from "@/lib/firebase.js"

import postsJson from "@/public/posts.json";

export default async (req, res) => {
	const slug = req.query.slug;
	const doc = db().collection("post-views").doc(slug)

	if (!(await doc.get()).exists) {
		const postExists = postsJson.find(post => {
			return post.slug === slug
		});

		if (postExists) {
			const newDoc = {
				viewCount: 1
			}

			doc.create(newDoc)
			return res.status(200).json(newDoc)
		} else {
			return res.status(200).json({ viewCount: null, reason: "[slug] doesn't exist" })
		}
	}

	if (req.method === "POST") {
		// increment the viewCount

		doc.update('viewCount', db.FieldValue.increment(1)).then(() => {
			return doc.get()
		}).then((doc) => {
			console.log("Success", doc)

			return res.status(200).json(doc.data())
		})

	}

	if (req.method === "GET") {
		// Return the viewCount

		const snapshot = await doc.get()
		const views = snapshot.data()

		return res.status(200).json(views)
	}
}