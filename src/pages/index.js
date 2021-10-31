import { getSession } from "next-auth/client";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import db from "../../firebase";

export default function Home(props) {
  const [searchValue, setSearchValue] = useState("");
  console.log(props)
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header setSearchValue={setSearchValue} searchValue={searchValue} />

      <main className="max-w-screen-2xl mx-auto">
        <ProductFeed products={props.products} searchValue={searchValue} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const session = await getSession(context);
  // const products = await fetch("https://fakestoreapi.com/products").then(
  //   (res) => res.json()
  // );
  const firebaseItems = await db.collection("items").orderBy("timestamp", "desc").get();

  const products = await Promise.all(
    firebaseItems.docs.map(async (item) => ({
      id: item.id,
      title: item.data().title,
      images: item.data().images,
      desc: item.data().desc,
      price: item.data().price,
      category: item.data().category
    }))
  );

  console.log(products)

  return { props: { products } };
}
//https://fakestoreapi.com/products
