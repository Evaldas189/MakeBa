import Sidebar from "./components/Sidebar";
import moment from "moment";
import { db } from "../../../firebase";
import Hoc from './components/Hoc'
import { useEffect, useState } from "react"

function orders({allOrders}) {

   const [searchValue, setSearchValue] = useState("")

   useEffect(() => {
    
   }, [searchValue])

    return (
      <div className="flex flex-row w-full">
        <Sidebar selected="orders" />
        <main className="p-6 w-full">
          <input spellcheck="false" 
            type="text"
            autoComplete="new-password"
            placeholder="Search by typing user email..."
            className="p-2 h-8 w-2/4 flex-grow bg-gray-600 flex-shrink rounded-md text-white focus:outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <table className="table-fixed mt-4">
            <thead>
              <tr>
                <th className="w-1/8">Nr.</th>
                <th className="w-1/4">Email</th>
                <th className="w-1/6">Quantity</th>
                <th className="w-1/4">Full Price</th>
                <th className="w-1/2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.filter(order => order.email.includes(searchValue))?.map((order, index) => (
                <tr className="p-4">
                  <td className="text-center border">{index + 1}</td>
                  <td className="text-center border">{order.email}</td>
                  {/* <td>{order.country}</td>
                  <td>{order.address}</td> */}
                  <td className="text-center border">{order.items.length}</td>
                  <td className="text-center border">{order.amount}€</td>
                  <td className="text-center border">{moment(order.timestamp * 1000).format('YYYY-MM-DD') }</td>
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
      email: order.data().email,
      // country: order.data().country,
      // address: order.data().address
    }))
  );

  return {
    props: {
      allOrders
    },
  };
}
