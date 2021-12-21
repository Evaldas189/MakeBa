import Sidebar from "./components/Sidebar";
import bodyParser from "body-parser";
import { promisify } from "util";
import * as adminFirebase from "firebase-admin";
import Hoc from './components/Hoc'
import { useState } from "react";

const getBody = promisify(bodyParser.urlencoded());

function products() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  return (
    <div className="flex flex-row w-full">
      <Sidebar selected="products" />
      <main className="w-full">
        <form method="post">
          <div
            style={{ backgroundColor: "rgb(137 179 189)" }}
            className="w-full h-screen flex flex-col items-center justify-center"
          >
            <input spellcheck="false" 
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="title"
            />
            <input spellcheck="false" 
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="description"
            />
            <input spellcheck="false" 
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="category"
            />
            <input spellcheck="false" 
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="price"
            />
            <input spellcheck="false" 
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="image"
            />
            <input spellcheck="false" 
              name="image2"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="image2"
            />
            <input spellcheck="false" 
              name="image3"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="image3"
            />
            <input spellcheck="false" 
              name="image4"
              value={image4}
              onChange={(e) => setImage4(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="image4"
            />

            <button
              type="submit"
              className="button text-white border-black my-2 min-w-md"
            >
              ADD NEW ITEM
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Hoc(products);

export async function getServerSideProps({ req, res }) {
  if (req.method === "POST") {
    await getBody(req, res);
    const serviceAccount = require("../../../permissions.json");
    const app = !adminFirebase.apps.length
      ? adminFirebase.initializeApp({
          credential: adminFirebase.credential.cert(serviceAccount),
        })
      : adminFirebase.app();
    app
      .firestore()
      .collection("items")
      .doc()
      .set({
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        category: req.body.category,
        images: [
          req.body?.image,
          req.body?.image2,
          req.body?.image3,
          req.body?.image4,
        ],
        timestamp: adminFirebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("ITEM ADDED");
      });
  }
  return {
    props: {},
  };
}
