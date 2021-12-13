import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { addToBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";
import {
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";

const MAX_RATING = 5;
const MIN_RATING = 1;
function Product({ id, title, price, desc, category, images, index }) {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  
  const router = useRouter();

  const addItemToBasket = (e) => {
    e.stopPropagation()
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
  };

  const showProductInfo = ()=> {
    router.push({
      pathname: "/product",
      query: { id: id },
    });
  }

  return (
    //hover:scale-105
    <div onClick={()=> showProductInfo()} className="relative cursor-pointer rounded-lg hover:scale-105 shadow-md flex flex-col m-2 bg-white z-30 pb-5 md:pt-10 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image className="rounded-sm" src={images} height={200} width={200} objectFit="contain" />
      <h4 className="my-3 line-clamp-2">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{desc}</p>
      <div className="mb-2 md:mb-5 font-bold">
        <Currency quantity={price} currency="EUR" />
      </div>
      <button onClick={(e)=>addItemToBasket(e)} className=" z-50 mt-auto hidden text-white font-bold md:flex flex-row justify-center items-center button">
        <ShoppingCartIcon className="h-6 mr-2 text-white"/> Add to Cart
      </button>
    </div>
  );
}

export default Product;
