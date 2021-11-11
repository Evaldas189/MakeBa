import { getSession } from "next-auth/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import db from "../../firebase";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

export default function Home({products}) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  console.log(router.query.value)
  
  return (
    <div className="bg-gray-100">
      <ToastContainer autoClose={2000} closeOnClick/>
      <Head>
        <title>MakeBa</title>
      </Head>

      <Header setSearchValue={setSearchValue} searchValue={router?.query.value ? router?.query.value : searchValue} />

      <main className="max-w-screen-2xl mx-auto">
        <ProductFeed products={products} searchValue={router?.query.value ? router?.query.value : searchValue} />
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
