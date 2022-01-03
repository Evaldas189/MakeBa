
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import * as admin from "firebase-admin";

// Secure a connection to firebase

const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

export default async (req, res) => {
  const { items, email } = req.body;

  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    price_data: {
      currency: "eur",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.images],
      },
    }, 
  }));

  let r = Date.now()
  let session = null;
  app
    .firestore()
    .collection("images")
    .doc(r.toString())
    .set({
      images: items.map((item) => item.images),
    })
    .then(async() => {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["GB", "US", "CA","LT"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
          email: email,
          images: r.toString()
        },
      });
      res.status(200).json({ id: session.id })
    })
    
};
