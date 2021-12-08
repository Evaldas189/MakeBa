import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromCart, updateBasket } from "../slices/basketSlice";
import { TrashIcon } from "@heroicons/react/outline";
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const getDropdownLength = () => {
  const dropdownLength = [];

  for (var i = 1; i <= 20; i++) {
    dropdownLength.push(i);
  }
  return dropdownLength;
};


function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
  quantity,
}) {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const removeItemFromCart = () => {
    dispatch(removeFromCart({ id }));
  };

  const updateQuantity = ({id, number})=>{
     setItemQuantity(number);
     dispatch(updateBasket({id, number}));
  }
  
  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="EUR" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              className="w-12"
              loading="lazy"
              src="https://logodix.com/logo/5638.jpg"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
      <TrashIcon onClick={()=>removeItemFromCart()} style={{backgroundColor: "#ae0707"}} className="h-10 p-2 cursor-pointer rounded-md text-white"/>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {itemQuantity}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="dropdown py-1 max-h-28 overflow-scroll overflow-x-hidden ">
                {getDropdownLength().map((number) => (
                  <Menu.Item onClick={()=> updateQuantity({id, number})}>
                    {({ active }) => (
                      <a
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {number}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        
      </div>
    </div>
  );
}

export default CheckoutProduct;
