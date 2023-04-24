const pdf = require("html-pdf");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");

exports.handler = async (event) => {
	const invoiceData = JSON.parse(event.body);

	// Render the EJS invoice template with the data
	const ejsData = await ejs.renderFile("./invoice_template.ejs", {
		invoiceData,
	});

	// Generate the PDF from the rendered EJS template
	const pdfData = await new Promise((resolve, reject) => {
		pdf.create(ejsData).toBuffer((err, buffer) => {
			if (err) reject(err);
			else resolve(buffer);
		});
	});

	// Configure Nodemailer to send the email
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	// Define the email message
	const message = {
		from: "Your Company <noreply@yourcompany.com>",
		to: invoiceData.customerEmail,
		subject: "Invoice",
		text: "Please see the attached invoice.",
		attachments: [
			{
				filename: "invoice.pdf",
				content: pdfData,
				contentType: "application/pdf",
			},
		],
	};

	// Send the email
	await transporter.sendMail(message);

	// Return a success response
	return {
		statusCode: 200,
		body: "Invoice sent successfully",
	};
};
