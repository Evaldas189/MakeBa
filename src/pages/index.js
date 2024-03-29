import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import FIlter from "../components/FIlter";
import moment from "moment";
import Footer from "../components/Footer";

export default function Home({products}) {
  const [searchValue, setSearchValue] = useState("");
  const [openFilter, setOpenFilter] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (openFilter === true) {
    }
  }, [openFilter]);
  return (
    <div className="bg-gray-100">
      <Head>
        <title>MakeBa</title>
        <meta name="theme-color" content="#128698" />
      </Head>

      <Header
        setSearchValue={setSearchValue}
        products={products}
        searchValue={
          router?.query?.category ? router?.query?.category : searchValue
        }
        openFilter={openFilter}
      />

      <main className="max-w-screen-2xl mx-auto">
        <ProductFeed
          products={products}
          setOpenFilter={setOpenFilter}
          searchValue={
            router?.query?.category ? router?.query?.category : searchValue
          }
          openFilter={openFilter}
        />
      </main>
      <Footer />
      {openFilter && <FIlter setOpenFilter={setOpenFilter} />}
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
      category: item.data().category,
      timestamp: moment(item.data().timestamp.toDate()).unix(),
    }))
  );

  return { props: { products } };
}
