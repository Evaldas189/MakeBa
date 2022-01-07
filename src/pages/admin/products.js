import Sidebar from "./components/Sidebar";
import bodyParser from "body-parser";
import { promisify } from "util";
import * as adminFirebase from "firebase-admin";
import Hoc from './components/Hoc'
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'


const getBody = promisify(bodyParser.urlencoded());

function products() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [error, setError] = useState("");

  function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  const isValidItem = (e) => {
    if(title === "" || desc === "" || price === "", category === "Select a category" ){
      e.preventDefault()
      setError("Fill all fields");
      return false;
    }
    if (
      !isValidURL(image) &&
      !isValidURL(image2) &&
      !isValidURL(image3) &&
      !isValidURL(image4)
    ) {
      e.preventDefault()
      setError("Invalid image link");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const categories = [
    "Electronics",
    "Pet Supplies",
    "Automotive and Car Care",
    "Arts and Crafts",
    "Toys & Games",
    "Beauty & Personal Care",
    "Home & kitchen",
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="flex flex-row w-full">
      <Sidebar selected="products" />
      <main className="w-full">
        <form method="POST">
          <div
            style={{ backgroundColor: "rgb(137 179 189)" }}
            className="w-full h-screen flex flex-col items-center justify-center"
          >
            <input
              spellcheck="false"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="title"
              autoComplete="off"
            />
            <input
              spellcheck="false"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="description"
              autoComplete="off"
            />
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="adminInput inline-flex justify-start w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                  {category}
                  <ChevronDownIcon
                    className="absolute right-5 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="dropdown py-1 max-h-64 overflow-scroll overflow-x-hidden ">
                    {categories.map((category) => (
                      <Menu.Item onClick={()=> setCategory(category)} >
                        {({ active }) => (
                          <a
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm cursor-pointer"
                            )}
                          >
                            {category}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <input
              spellcheck="false"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="adminInput"
              type="number"
              placeholder="price"
              autoComplete="off"
            />
            <input
              spellcheck="false"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="1 image url"
              autoComplete="off"
            />
            <input
              spellcheck="false"
              name="image2"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="2 image url"
              autoComplete="off"
            />
            <input
              spellcheck="false"
              name="image3"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="3 image url"
              autoComplete="off"
            />
            <input
              spellcheck="false"
              name="image4"
              value={image4}
              onChange={(e) => setImage4(e.target.value)}
              className="adminInput"
              type="text"
              placeholder="4 image url"
              autoComplete="off"
            />
            {error !== "" && (
              <label className="m-1 text-red-500">{error}</label>
            )}
            <button
              type="submit"
              className="button text-white border-black my-2 min-w-md"
              onClick={(e) => isValidItem(e)}
            >
              Add new item
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
