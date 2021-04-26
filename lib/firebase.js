require('dotenv').config()
import * as admin from "firebase-admin"

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: "portfolio-3a584",
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_PRIVATE_KEY,

		}),
		databaseURL: "https://portfolio-3a584.firebaseio.com"
	});
}
export default admin.firestore;