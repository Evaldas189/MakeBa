import { getSession } from "next-auth/client";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import db from "../../firebase";

export default function Home({products}) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="bg-gray-100">
      <Head>
        <title>MakeBa</title>
      </Head>

      <Header setSearchValue={setSearchValue} searchValue={searchValue} />

      <main className="max-w-screen-2xl mx-auto">
        <ProductFeed products={products} searchValue={searchValue} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
 
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

  return { props: { products } };
}
