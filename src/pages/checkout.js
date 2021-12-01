import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import Spinner from "../svg/Spinner";
import { db } from "../../firebase";
import moment from "moment";


const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout({products}) {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const total = useSelector(selectTotal);
  const [spinner, setSpinner] = useState(false);
console.log("sesija :" + session)

  const createCheckoutSession = async () => {
    setSpinner(true);
    console.log(items)
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div className="bg-gray-100">
      <Header products={products}/>
      <main className="relative lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow my-5 md:m-5 shadow-sm">
          {items?.length === 0 && (
            <Image
              src="/images/emptyCart.png"
              width={"1000"}
              height={250}
              objectFit="contain"
            />
          )}
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items?.length === 0
                ? "Your Basket is empty :("
                : "Shopping Basket"}
            </h1>

            {items?.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.images[1] === "t" ? item.images : item.images[0]}
                hasPrime={item.hasPrime}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
        {items?.length > 0 && (
          <div className="flex flex-col md:my-5  bg-white p-10 shadow-md">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal ({items?.length} items):{" "}
                  <span className="font-bold">
                    <Currency quantity={total} currency="EUR" />
                  </span>
                </h2>

                <button
                  role="link"
                  onClick={createCheckoutSession}
                  disabled={!session}
                  style={{backgroundColor: !session && "gray" }}
                  className={`button text-white ${spinner && "flex justify-center"} mt-2 ${
                    !session &&
                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {!session ? (
                    "Sign in to checkout"
                  ) : spinner ? (
                    <svg
                      className="animate-spin  h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Proceed to checkout"
                  )}
                </button>
              </>
            )}
          </div>
        )}
         {/* {!openLoading && <Spinner/>} */}
      </main>
    </div>
  );
}

export default Checkout;

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
