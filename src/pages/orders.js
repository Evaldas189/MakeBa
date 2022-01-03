import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import moment from "moment";
import { db } from "../../firebase";
import Order from "../components/Order";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Orders({ orders, products }) {
  const router = useRouter();
  const [session] = useSession();

  return (
    <div>
      {products?.length > 0 && <Header products={products} />}
      {session && (
        <main className="relative max-w-screen-lg mx-auto p-10">
          <h1 className="text-3xl border-b mb-2 pb-1 border-black">
            {orders.filter(order => order.images !== null)?.length} Orders
          </h1>
          <div className="mt-5 space-y-4">
            {orders.filter(order => order.images !== null)?.map(
              ({ id, amount, amountShipping, items, timestamp, images }) => (
                <Order
                  kry={id}
                  id={id}
                  amount={amount}
                  amountShipping={amountShipping}
                  items={items}
                  timestamp={timestamp}
                  images={images}
                />
              )
            )}
          </div>
          {/* {openLoading && <Spinner/>} */}
        </main>
      )}
    </div>
  );
}

export default Orders;
export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  } else {
    const stripeOrders = await db
      .collection("users")
      .doc(session.user.email)
      .collection("orders")
      .orderBy("timestamp", "desc")
      .get();

    const orders = await Promise.all(
      stripeOrders.docs.map(async (order) => ({
        id: order.id,
        amount: order.data().amount,
        images: await db
          .collection("images")
          .doc(order.data().images.toString())
          .get()
          .then((snap) => {
            if(snap.data()){
            return JSON.parse(JSON.stringify(snap.data().images));
            }
            else return null
          }),
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: (
          await stripe.checkout.sessions.listLineItems(order.id, {
            limit: 100,
          })
        ).data,
      }))
    );

    const firebaseItems = await db
      .collection("items")
      .orderBy("timestamp", "desc")
      .get();

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


    return {
      props: {
        orders,
        products
      },
    };
  }
}
