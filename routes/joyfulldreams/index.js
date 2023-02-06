const path = require("path");
const process = require("process");
const { google, Auth } = require("googleapis");

require("dotenv").config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

const express = require("express");
const router = express.Router();

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");

async function authorize() {
    const auth = new Auth.GoogleAuth({
        keyFile: CREDENTIALS_PATH,
        scopes: SCOPES,
    });

    const client = await auth.getClient();

    return client;
}

router.post("/stripe-hook", async (req, res) => {
    try {
        if (req.query.secret !== process.env.STRIPE_HOOK_SECRET) {
            return res.status(200).json({ message: "Unauthorized" });
        }

        if (req.body.type !== "payment_intent.succeeded") {
            return res.status(200).json({
                message: "Event not allowed",
                error: `Event was ${req.body.type}. Only payment_intent.succeeded is allowed`,
            });
        }

        const paymentIntent = req.body.object;
        const invoice = paymentIntent.invoice;
        const customer = paymentIntent.customer;

        // Get auth
        const auth = await authorize();
        const sheets = google.sheets({ version: "v4", auth });

        const currentRow = 2; // TODO: REPLACE

        const updateRes = await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `A${currentRow}:L${currentRow}`,
            valueInputOption: "RAW",
            requestBody: {
                values: [
                    [
                        invoice.id, // Transaction ID
                        customer.shipping.name || customer.name, // Name
                        invoice.lines?.[0]?.quantity, // Quantity
                        invoice.total, // Amount
                        customer.email, // Email
                        customer.shipping.phone || customer.phone, // Phone
                        customer.shipping.address.country, // Country
                        customer.shipping.address.line1, // Address 1
                        customer.shipping.address.line2, // Address 2
                        customer.shipping.address.city, // City
                        customer.shipping.address.state, // State
                        customer.shipping.address.postal_code, // Zipcode
                    ],
                ],
            },
        });

        return res
            .status(200)
            .json({ message: "Hook was called and processed" });
    } catch (e) {
        console.error(e);
        return res.status(200).json({ message: "Error", error: e });
    }
});

module.exports = router;
