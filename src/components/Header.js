import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  XIcon
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { useEffect, useRef, useState } from "react";

const categories = [
  "Electronics",
  "Pet Supplies",
  "Automotive and Car Care",
  "Arts and Crafts",
  "Toys & Games",
  "Beauty & Personal Care",
  "home & kitchen"
];

function Header({setSearchValue, searchValue}) {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [openNavBar, setOpenNavBar] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = categories.filter(c =>
      c.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    console.log(searchValue)
    setOpenSearch(false)
    setSearchTerm(searchValue);
    
  }, [searchValue])

  return (
    <header>
      <div className="flex items-center bg-gradient-to-b from-red-800 to-red-600 p-1 flex-grow py-2">
        <div className="logo flex items-center justify-start flex-grow  px-4 md:px-10 font-fantasy text-white">
          <div
            className="hidden sm:block hover:cursor-pointer"
            onClick={() => {
              router.push({
                pathname: "/",
              });
            }}
          >
            <Image
              src="/images/logo.png"
              width={120}
              height={50}
              objectFit="contain"
            />
          </div>
          <div
            className="block sm:hidden hover:cursor-pointer"
            onClick={() =>
              router.push({
                pathname: "/checkout",
              })
            }
          >
            <Image
              src="/images/aha4.png"
              width={100}
              height={70}
              objectFit="contain"
            />
          </div>
        </div>
        <div
          className={`relative hidden items-center rounded-md border-gray-400 h-10 bg-gray-100 hover:bg-gray-200 sm:flex cursor-pointer flex-grow max-w-md`}
        >
          {/* <input
            type="text"
            placeholder="Search"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
          />
         
            <SearchIcon className="h-12 p-4" /> */}
          <input
            type="text"
            placeholder="Search"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => {
              setOpenSearch(true);
            }}
            onBlur={() =>
              setTimeout(function () {
                setOpenSearch(false);
              }, 100)
            }
          />

          <SearchIcon className="h-12 p-4" />
          {searchTerm?.length > 0 && searchResults.length > 0 && (
            <ul
              className={`dropdown ${
                openSearch ? "block" : "hidden"
              } bg-white max-h-60 overflow-x-hidden z-50 border-t-2 absolute top-9 w-full border-gray-400 rounded-b-md`}
            >
              {searchResults.map((item) => (
                <li
                  onClick={() => { !router.pathname === "/checkout" || !router.pathname === "/orders" ? setSearchValue(item) : router.push({
                    pathname: '/',
                    query: { value: item}, 
                  })}}
                  className="hover:bg-gray-100 p-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="text-white flex items-center text-sm font-medium space-x-6 mx-3 md:mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="link">
            <p className="hover:underline">
              {session ? `Hello, ${session.user.name}` : "Sign In"}
            </p>
            <p className="font-medium md:text-sm">Account & Lists</p>
          </div>
          <div
            onClick={() => {
              router.push({
                pathname: '/orders',
              });
            }}
            className="link"
          >
            <p>Returns</p>
            <p className="font-medium md:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => {
              router.push({
                pathname: '/checkout',
              });
            }}
            className="relative flex items-center link"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items?.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-medium md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* <div className="shop-menu flex items-center justify-center text-white text-sm space-x-3 p-2 pl-6">
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div> */}
      <nav className="shop-menu flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center lg:text-center text-white text-sm space-x-3 p-2 pl-6">
        {!openNavBar ? (
          <div className="block lg:hidden w-full">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setOpenNavBar(true)}
                className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400"
              >
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
              <div className="text-center">Logout</div>
            </div>
          </div>
        ) : (
          <XIcon
            onClick={() => setOpenNavBar(false)}
            className="h-8 relative -left-2"
          />
        )}

        <div
          className={`${
            openNavBar === false ? "hidden" : "block"
          } w-full flex-grow lg:flex lg:items-center lg:w-auto `}
        >
          <div className="text-sm lg:flex-grow">
            <a
              className="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              onClick={() => { !router.pathname === "/checkout" || !router.pathname === "/orders" ? setSearchValue("Electronics") : router.push({
                pathname: '/',
                query: { value: "Electronics"}, 
              })}}
            >
              Electronics
            </a>
            <a
              className="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              onClick={() => { !router.pathname === "/checkout" || !router.pathname === "/orders" ? setSearchValue("home & kitchen") : router.push({
                pathname: '/',
                query: { value: "home & kitchen"}, 
              })}}
            >
              home & kitchen
            </a>
            <a
              className="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              onClick={() => { !router.pathname === "/checkout" || !router.pathname === "/orders" ? setSearchValue("Automotive and Car Care") : router.push({
                pathname: '/',
                query: { value: "Automotive and Car Care"}, 
              })}}
            >
              Automotive and Car Care
            </a>
            <a
              className="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              onClick={() => { !router.pathname === "/checkout" || !router.pathname === "/orders" ? setSearchValue("Arts and Crafts") : router.push({
                pathname: '/',
                query: { value: "Arts and Crafts"}, 
              })}}
            >
              Arts and Crafts
            </a>
            <a
              className="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              onClick={() => { !router.pathname === "/checkout" || !router.pathname === "/orders" ? setSearchValue("Toys & Games") : router.push({
                pathname: '/',
                query: { value: "Toys & Games"}, 
              })}}
            >
              Toys & Games
            </a>
            <a
              className="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-6"
              onClick={() => { !router.pathname === "/checkout" || !router.pathname === "/orders" ? setSearchValue("Beauty & Personal Care") : router.push({
                pathname: '/',
                query: { value: "Beauty & Personal Care"}, 
              })}}
            >
              Beauty & Personal Care
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
