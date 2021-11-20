import { getSession } from "next-auth/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import db from "../../firebase";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import FIlter from "../components/FIlter";

export default function Home({products}) {
  const [searchValue, setSearchValue] = useState("");
  const [openFilter, setOpenFilter] = useState(false)
  const router = useRouter();
  
  return (
    <div className="bg-gray-100">
      <ToastContainer autoClose={2000} closeOnClick/>
      <Head>
        <title>MakeBa</title>
        <meta name="theme-color" content="rgba(229, 231, 235)" >
      </Head>

      <Header setSearchValue={setSearchValue} searchValue={router?.query.value ? router?.query.value : searchValue} />

      <main className="max-w-screen-2xl mx-auto">
        <ProductFeed products={products} setOpenFilter={setOpenFilter} searchValue={router?.query.value ? router?.query.value : searchValue} />
      </main>
      {openFilter && <FIlter setOpenFilter={setOpenFilter}/>}
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
