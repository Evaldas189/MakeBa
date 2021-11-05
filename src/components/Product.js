import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { addToBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/client";


const MAX_RATING = 5;
const MIN_RATING = 1;
function Product({ id, title, price, desc, category, images, openModal }) {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  
  const [session] = useSession();

  const addItemToBasket = () => {
    if (!session) {
      openModal(true)
    } else {
      const product = {
        id,
        title,
        price,
        rating,
        desc,
        category,
        images,
        hasPrime,
        quantity: 1,
      };
      toast("Added to the cart!");

      dispatch(addToBasket(product));
    }
  };

  return (
    //hover:scale-105
    <div className="relative rounded-lg shadow-md flex flex-col m-5 bg-white z-30 p-10">
      <ToastContainer autoClose={2000}/>
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={images} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{desc}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://logodix.com/logo/5638.jpg"
            alt=""
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="mt-auto text-white font-bold flex flex-row justify-center items-center button">
        <ShoppingCartIcon className="h-6 mr-2 text-white"/> Add to Cart
      </button>
    </div>
  );
}

export default Product;
