import Sidebar from "./components/Sidebar";
import moment from "moment";
import { db } from "../../../firebase";
import Hoc from './components/Hoc'

function orders({orders}) {

    return (
      <div className="flex flex-row w-full">
        <Sidebar selected="orders" />
        <main className="p-6 w-full">
          <table class="table-fixed">
            <thead>
              <tr>
                <th class="w-1/2">Title</th>
                <th class="w-1/4">Author</th>
                <th class="w-1/4">Views</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Intro to CSS</td>
                <td>Adam</td>
                <td>858</td>
              </tr>
              <tr class="bg-blue-200">
                <td>
                  A Long and Winding Tour of the History of UI Frameworks and
                  Tools and the Impact on Design
                </td>
                <td>Adam</td>
                <td>112</td>
              </tr>
              <tr>
                <td>Intro to JavaScript</td>
                <td>Chris</td>
                <td>1,280</td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    );
}

export default Hoc(orders)

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const stripeOrders = await db
    .collection("users")
    .doc()
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  console.log(orders)

  return {
    props: {
      orders,
    },
  };
}
