const admin = require("firebase-admin");
const scheduler = require("node-schedule");
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

	const { uid, orderId, eta } = event.queryStringParameters;

	const changeOrderStatus = async (orderStatus) => {
		await db
			.collection("users")
			.doc(uid)
			.collection("orders")
			.doc(orderId)
			.update({
				orderStatus,
			});
	};

	try {
		let adjustedEta = parseInt(eta, 10);

		if (adjustedEta >= 1) {
			const dispatchTime = new Date(Date.now() + (adjustedEta / 3) * 60 * 1000);
			const shipTime = new Date(Date.now() + (adjustedEta / 2) * 60 * 1000);
			const deliverTime = new Date(Date.now() + adjustedEta * 60 * 1000);

			scheduler.scheduleJob(dispatchTime, async () => {
				await changeOrderStatus("dispatched");
			});

			scheduler.scheduleJob(shipTime, async () => {
				await changeOrderStatus("shipped");
			});

			scheduler.scheduleJob(deliverTime, async () => {
				await changeOrderStatus("delivered");
			});
		} else {
			await changeOrderStatus("delivered");
		}

		return {
			statusCode: 201,
			body: JSON.stringify(true),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal server error" }),
		};
	}
};
