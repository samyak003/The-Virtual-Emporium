// Import the Stripe SDK and initialize it with your API key
const stripe = require("stripe")(
	"sk_test_51HT8jXJrqKXQUv0D0XtQLpsEOE0hhJiBXdp1BAsXrTvEebpVzLgSKzF7gEQGUjblcUDCBrpcpBO3mHW1SG6HhZCS004RtTwBUQ",
);

exports.handler = async (event, context) => {
	const { total } = event.queryStringParameters;
	console.log("Payment Request Received BOOM!! for this amount >>> ", total);

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,
			currency: "usd",
		});

		return {
			statusCode: 201,
			body: JSON.stringify({
				clientSecret: paymentIntent.client_secret,
			}),
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: err.message,
			}),
		};
	}
};
