const admin = require("firebase-admin");
const serviceAccount = require("./the-virtual-emporium-firebase-adminsdk-jkczr-30eda5481f.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.handler = async (event, context) => {
	if (event.httpMethod !== "GET") {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Method not allowed" }),
		};
	}

	const { uid, orderId } = event.queryStringParameters;

	db.collection("users").doc(uid).collection("orders").doc(orderId).update({
		cancelled: true,
	});

	return {
		statusCode: 201,
	};
};
