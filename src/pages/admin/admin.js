import { useEffect, useState } from "react";
import bodyParser from "body-parser";
import { promisify } from "util";
import * as adminFirebase from "firebase-admin";
import { auth } from '../../../firebase';
import { database } from '../../../firebase';
import { useRouter } from "next/router";


const getBody = promisify(bodyParser.urlencoded());

function admin() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if(auth?.currentUser){
      const userRef = database.ref(auth.currentUser.uid);
      userRef.on("value", (snapshot) => {
        snapshot.forEach((data) => {
          const role = data.val();
          if (role !== "admin") {
            router.push("/admin/login");
          }
          else{
            setIsAdmin(true)
          } 
        });
      });
    }
    else{
      router.push("/admin/login");
    }
  }, [])

  return (
    <>
    {auth?.currentUser && isAdmin ? 
    <form method="post">
      <div className="w-screen h-screen bg-gray-600 flex flex-col items-center justify-center">
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="adminInput"
          type="text"
          placeholder="title"
        />
        <input
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="adminInput"
          type="text"
          placeholder="description"
        />
        <input
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="adminInput"
          type="text"
          placeholder="category"
        />
         <input
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="adminInput"
          type="text"
          placeholder="price"
        />
        <input
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="adminInput"
          type="text"
          placeholder="image"
        />
        <input
          name="image2"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
          className="adminInput"
          type="text"
          placeholder="image2"
        />
        <input
          name="image3"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
          className="adminInput"
          type="text"
          placeholder="image3"
        />
        <input
          name="image4"
          value={image4}
          onChange={(e) => setImage4(e.target.value)}
          className="adminInput"
          type="text"
          placeholder="image4"
        />

        <button
          type="submit"
          className="button my-2 min-w-md"
        >
          ADD NEW ITEM
        </button>
      </div>
    </form>
    : null}
    </>
  );
}

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

export default admin;
