const path = require("path");
const process = require("process");

require("dotenv").config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

const { google, Auth } = require("googleapis");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

        if (req.body.type !== "checkout.session.completed") {
            return res.status(200).json({
                message: "Event not allowed",
                error: `Event was ${req.body.type}. Only checkout.session.completed is allowed`,
            });
        }

        const body = req.body.data.object;

        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            body.id,
            {
                expand: ["line_items", "customer"],
            }
        );

        if (sessionWithLineItems.payment_status !== "paid") {
            return res.status(200).json({
                message:
                    "Order not paid. You may have enabled delayed payments.",
            });
        }

        const lineItems = sessionWithLineItems.line_items;
        if ((lineItems?.length ?? 0) === 0)
            return res.status(200).json({ message: "Line items not found." });

        const customer = sessionWithLineItems.customer;
        if (!customer)
            return res
                .status(200)
                .json({
                    message: "Customer not found.",
                    customer_details: sessionWithLineItems.customer_details,
                });

        // Get auth
        const auth = await authorize();
        const sheets = google.sheets({ version: "v4", auth });

        // Find highest row
        const values = (
            await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SPREADSHEET_ID,
                range: `A:A`,
            })
        ).data.values;

        let currentRow = 0;
        while (values[currentRow] && values[currentRow][0] != "") {
            currentRow++;
        }
        currentRow += 1;

        // Update row
        await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `A${currentRow}:L${currentRow}`,
            valueInputOption: "RAW",
            requestBody: {
                values: [
                    [
                        sessionWithLineItems.id, // Transaction ID
                        customer.shipping.name || customer.name, // Name
                        lineItems[0]?.quantity, // Quantity
                        sessionWithLineItems.amount / 100, // Amount
                        customer.email, // Email
                        sessionWithLineItems.shipping?.phone || customer.phone, // Phone
                        sessionWithLineItems.shipping?.address.country ||
                            customer.shipping?.address.country, // Country
                        sessionWithLineItems.shipping?.address.line1 ||
                            customer.shipping?.address.line1, // Address 1
                        sessionWithLineItems.shipping?.address.line2 ||
                            customer.shipping?.address.line2, // Address 2
                        sessionWithLineItems.shipping?.address.city ||
                            customer.shipping?.address.city, // City
                        sessionWithLineItems.shipping?.address.state ||
                            customer.shipping?.address.state, // State
                        sessionWithLineItems.shipping?.address.postal_code ||
                            customer.shipping?.address.postal_code, // Zipcode
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
