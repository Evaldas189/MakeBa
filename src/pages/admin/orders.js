import Sidebar from "./components/Sidebar";
import moment from "moment";
import { db } from "../../../firebase";
import Hoc from './components/Hoc'
import { useState } from "react"

function orders({allOrders}) {

   const [searchValue, setSearchValue] = useState("")
   console.log(allOrders)

    return (
      <div className="flex flex-row w-full">
        <Sidebar selected="orders" />
        <main className="p-6 w-full">
          <input
            type="text"
            placeholder="Search by typing user email..."
            className="p-2 h-8 w-2/4 flex-grow bg-gray-600 flex-shrink rounded-md text-white focus:outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="w-1/2">Title</th>
                <th className="w-1/4">Author</th>
                <th className="w-1/4">Views</th>
              </tr>
            </thead>
            <tbody>
              {allOrders?.map((order) => (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.amount}</td>
                  <td>{order.timestamp}</td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </main>
      </div>
    );
}

export default Hoc(orders)

export async function getServerSideProps() {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const stripeOrders = await db.collectionGroup("orders")
    .get();

  const allOrders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      allOrders
    },
  };
}
