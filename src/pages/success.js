import Header from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { saveState } from '../slices/basketSlice'
import moment from "moment";
import { db } from "../../firebase";

function success({products}) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      saveState([])
    }, 1000);
  }, [])

  return (
    <div className="bg-gray-100 h-screen">
      <Header products={products} />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed{" "}
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send a conformation once your
            items has shipped, if you would like to check the status of your
            order(s) please press the button below
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8 text-white"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default success;

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
