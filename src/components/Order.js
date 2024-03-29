import moment from "moment";
import Currency from "react-currency-formatter";

function Order({ id, amount, amountShipping, items, timestamp, images }) {

  const getItemsLength = ()=>{
    let length = 0;
    items.forEach(item => {
      length += item.quantity;
    });
    return length;
  }

  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className="font-bold text-xs">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="EUR"></Currency>
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {getItemsLength()} items
        </p>
        <p className="hidden sm:inline-block absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER #{id}
        </p>
      </div>
      <div className="p-5 sm:pb-3 sm:p-10 ">
        <div className="flex space-x-6 overflow-auto pb-2">
          {images.map((image,i) => (
            <div className='min-w-max'>
            <img src={image} alt="" className="h-20 object-contain sm:h-32 min-w-20"/>
            <div className="hidden sm:block whitespace-nowrap text-center mt-1" >Quantity: {items[i].quantity}</div>
            <div className="whitespace-nowrap text-center mt-1 block sm:hidden" >Qty: {items[i].quantity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
