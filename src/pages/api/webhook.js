import { buffer } from "micro";
import * as admin from "firebase-admin";

// Secure a connection to firebase

const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Stripe

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecurit = process.env.STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
  console.log("Fullfilling Order!!!");

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      email: session.metadata.email,
    })
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = await stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointSecurit
      );
    } catch (e) {
      console.log("ERROR", e.message);
      return res.status(400).send({ message: "Webhook error: " + e.message });
    }
    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        await fullfillOrder(session);
      }

      res.status(200).send(`Received!`);
    } catch (err) {
      res.status(400).send(`Error: ${err}`);
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
