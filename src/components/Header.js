import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  XIcon,
  ChevronLeftIcon
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { useEffect, useRef, useState } from "react";
import UserIcon from "../svg/UserIcon";
import Account from "./Account";

const categories = [
  "Electronics",
  "Pet Supplies",
  "Automotive and Car Care",
  "Arts and Crafts",
  "Toys & Games",
  "Beauty & Personal Care",
  "home & kitchen",
];

function Header({ setSearchValue, searchValue, products, openFilter }) {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [productSearchResults, setProductSearchResults] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [openNavBar, setOpenNavBar] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false)

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = categories.filter((c) =>
      c.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    let productResults = [...products];
    productResults = products.filter((c) =>
      c.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setProductSearchResults(productResults);
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    openFilter && setSearchTerm("");
  }, [openFilter]);

  useEffect(() => {
    setOpenSearch(false);
    setSearchTerm(searchValue);
  }, [searchValue]);

  return (
    <header className="sticky border-b border-white sm:border-b-0 top-0 z-50 sm:static">
      {!openSearchBar && (
        <div className="top-header flex items-center p-1 flex-grow py-2">
          <ChevronLeftIcon
            onClick={() => router.back()}
            className="block sm:hidden h-8 text-white mt-2"
          />
          <div className="logo flex items-center justify-start flex-grow pl-1 sm:pl-4  px-4 md:px-10 font-fantasy text-white">
            <div
              className="hidden sm:block hover:cursor-pointer"
              onClick={() => {
                if (router.pathname === "/") {
                  location.reload();
                }
                router.push({
                  pathname: "/",
                });
              }}
            >
              <img
                src="/images/logo.png"
                width={120}
                height={50}
                objectFit="contain"
              />
            </div>
            <div
              className="block sm:hidden hover:cursor-pointer"
              onClick={() => {
                if (router.pathname === "/") {
                  location.reload();
                }
                router.push({
                  pathname: "/",
                });
              }}
            >
              <img
                style={{
                  marginBottom: 6,
                }}
                src="/images/aha4.png"
                objectFit="contain"
                className="mobileLogo"
              />
            </div>
          </div>
          <div
            style={{ flex: 2 }}
            className={`relative hidden items-center rounded-md border-gray-400 h-10 bg-gray-100 hover:bg-gray-200 sm:flex cursor-pointer flex-grow max-w-full`}
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
              onBlur={() => {
                setTimeout(function () {
                  setOpenSearch(false);
                }, 200);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  router.push(
                    {
                      pathname: "/",
                      query: { category: searchTerm },
                    },
                    { shallow: true }
                  );
                }
              }}
            />

            <SearchIcon
              className="h-12 p-4"
              onClick={() => {
                router.push(
                  {
                    pathname: "/",
                    query: { category: searchTerm },
                  },
                  { shallow: true }
                );
              }}
            />
            {!openSearchBar &&
              searchTerm?.length > 0 &&
              (searchResults.length > 0 || productSearchResults.length > 0) && (
                <ul
                  className={`dropdown ${
                    openSearch ? "block" : "hidden"
                  } bg-white border max-h-60 overflow-x-hidden z-50 border-t absolute top-9 w-full border-gray-400 rounded-b-md`}
                >
                  {searchResults.map((item) => (
                    <li
                      onClick={() => {
                        !router.pathname === "/checkout" ||
                        !router.pathname === "/orders"
                          ? setSearchValue(item)
                          : router.push(
                              {
                                pathname: "/",
                                query: { category: item },
                              },
                              { shallow: true }
                            );
                      }}
                      className="hover:bg-gray-100 p-2"
                    >
                      {item} <div className="text-yellow-600"> category </div>
                    </li>
                  ))}
                  {productSearchResults.map(({ title, price, id }) => (
                    <li
                      onClick={() => {
                        router.push({
                          pathname: "/product",
                          query: { id: id },
                        });
                      }}
                      className="hover:bg-gray-100 p-2"
                    >
                      {title}{" "}
                      <div className="text-yellow-600">
                        {" "}
                        product price: {price}{" "}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
          </div>
          <div className="text-white flex items-center text-sm font-medium space-x-6 mx-3 md:mx-6 whitespace-nowrap">
            {/* <div
              onClick={() => {
                router.push({
                  pathname: "/orders",
                });
              }}
              className="link"
            >
              <p>Returns</p>
              <p className="font-medium md:text-sm">& Orders</p>
            </div> */}
            <div
              className="block sm:hidden"
              onClick={() => setOpenSearchBar(true)}
            >
              <SearchIcon className="h-7 top-1 text-white" />
            </div>
            <div
              onClick={() => {
                router.push({
                  pathname: "/checkout",
                });
              }}
              className="relative flex items-center cursor-pointer"
            >
              <span className="absolute top-0 right-0 md:right-10 h-4 w-4 mr-1 bg-yellow-400 text-center rounded-full text-black font-bold">
                {items?.length}
              </span>
              <ShoppingCartIcon className="h-8 mr-1" />
              <p className="hidden md:inline font-medium md:text-sm mt-2 hover:text-yellow-400 active:text-yellow-500">
                Basket
              </p>
            </div>
            <div className="flex flex-row relative justify-center items-center">
              {!session ? (
                
                <>
                 {showAccountModal && (
                    <Account setOpenModal={setShowAccountModal} />
                  )}
                  <div
                    onClick={() => signIn()}
                    className="hidden sm:flex flex-row justify-center items-center cursor-pointer hover:text-yellow-400"
                  >
                    <UserIcon />
                    <p className="hidden sm:block mr-1 mt-2">Log in</p>
                  </div>
                  <div
                    onClick={() => setShowAccountModal(true)}
                    className="flex sm:hidden flex-row justify-center items-center cursor-pointer hover:text-yellow-400"
                  >
                    <UserIcon />
                  </div>
                  
                  <p className="hidden sm:block mt-2">{" | "}</p>
                  <p
                    className="hidden sm:block ml-1 cursor-pointer mt-2 hover:text-yellow-400"
                    onClick={() => router.push("/auth/signup")}
                  >
                    Register
                  </p>
                </>
              ) : (
                <div className="flex flex-row hover:text-yellow-400 justify-center relative items-center">
                  {showAccountModal && (
                    <Account setOpenModal={setShowAccountModal} />
                  )}
                  <div
                    onClick={() => setShowAccountModal(true)}
                    className="flex  flex-row justify-center relative items-center cursor-pointer"
                  >
                    <UserIcon />
                    <p className="hidden sm:block mr-1 mt-2 ml-1">
                      {session.user.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {openSearchBar && (
        <nav
          className={`shop-menu flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center md:text-center text-white text-sm space-x-3 p-2 ${
            !openSearchBar ? "pl-6" : ""
          }`}
        >
          <div className="block md:hidden w-full">
            <div className="flex justify-between items-center">
              <div
                className={`search-box ${
                  openSearchBar === true ? "openBar" : ""
                } relative d-flex justify-center align-center`}
              >
                <input
                  type="text"
                  value={searchTerm}
                  autoFocus
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
                {!openSearchBar ? (
                  <div
                    onClick={() => setOpenSearchBar(true)}
                    className="h-8 absolute w-9 right-2"
                  >
                    <SearchIcon
                      className="absolute h-5 top-1 text-black right-3"
                      style={{ marginTop: 1, marginRight: -3 }}
                    />
                  </div>
                ) : (
                  <XIcon
                    onClick={() => setOpenSearchBar(false)}
                    className="absolute h-8 text-white top-2 right-1"
                    style={{ marginTop: -3 }}
                  />
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
      <nav
        className={`shop-menu hidden md:flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center md:text-center text-white text-sm space-x-3 p-2 ${
          !openSearchBar ? "pl-6" : ""
        }`}
      >
        <div
          className={`${
            openNavBar === false ? "hidden" : "block"
          } w-full flex-grow md:flex md:items-center md:w-auto `}
        >
          <div className="text-sm sm:flex-grow">
            <a
              className="block cursor-pointer mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 active:text-red-400"
              onClick={() => {
                !router.pathname === "/checkout" ||
                !router.pathname === "/orders"
                  ? setSearchValue("Electronics")
                  : router.push(
                      {
                        pathname: "/",
                        query: { category: "Electronics" },
                      },
                      { shallow: true }
                    );
              }}
            >
              Electronics
            </a>
            <a
              className="block cursor-pointer mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 active:text-red-400"
              onClick={() => {
                !router.pathname === "/checkout" ||
                !router.pathname === "/orders"
                  ? setSearchValue("home & kitchen")
                  : router.push(
                      {
                        pathname: "/",
                        query: { category: "home & kitchen" },
                      },
                      { shallow: true }
                    );
              }}
            >
              home & kitchen
            </a>
            <a
              className="block cursor-pointer mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 active:text-red-400"
              onClick={() => {
                !router.pathname === "/checkout" ||
                !router.pathname === "/orders"
                  ? setSearchValue("Automotive and Car Care")
                  : router.push(
                      {
                        pathname: "/",
                        query: { category: "Automotive and Car Care" },
                      },
                      { shallow: true }
                    );
              }}
            >
              Automotive and Car Care
            </a>
            <a
              className="block cursor-pointer mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 active:text-red-400"
              onClick={() => {
                !router.pathname === "/checkout" ||
                !router.pathname === "/orders"
                  ? setSearchValue("Arts and Crafts")
                  : router.push(
                      {
                        pathname: "/",
                        query: { category: "Arts and Crafts" },
                      },
                      { shallow: true }
                    );
              }}
            >
              Arts and Crafts
            </a>
            <a
              className="block cursor-pointer mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 active:text-red-400"
              onClick={() => {
                !router.pathname === "/checkout" ||
                !router.pathname === "/orders"
                  ? setSearchValue("Toys & Games")
                  : router.push(
                      {
                        pathname: "/",
                        query: { category: "Toys & Games" },
                      },
                      { shallow: true }
                    );
              }}
            >
              Toys & Games
            </a>
            <a
              className="block cursor-pointer mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-6 active:text-red-400"
              onClick={() => {
                !router.pathname === "/checkout" ||
                !router.pathname === "/orders"
                  ? setSearchValue("Beauty & Personal Care")
                  : router.push(
                      {
                        pathname: "/",
                        query: { category: "Beauty & Personal Care" },
                      },
                      { shallow: true }
                    );
              }}
            >
              Beauty & Personal Care
            </a>
          </div>
        </div>
      </nav>
      {openSearchBar &&
        searchTerm?.length > 0 &&
        (searchResults.length > 0 || productSearchResults.length > 0) && (
          <ul
            style={{ backgroundColor: "#00718b", marginTop: 3 }}
            className={`dropdown ${
              openSearch ? "block" : "hidden"
            }  max-h-56 overflow-x-hidden z-50 p-0 fixed top-12 w-full`}
          >
            {searchResults.map((item) => (
              <li
                onClick={() => {
                  !router.pathname === "/checkout" ||
                  !router.pathname === "/orders"
                    ? setSearchValue(item)
                    : router.push(
                        {
                          pathname: "/",
                          query: { category: item },
                        },
                        { shallow: true }
                      );
                  setOpenSearchBar(false);
                }}
                className="hover:bg-gray-100 p-2 text-white active:bg-transparent"
              >
                {item}
                <div className="text-yellow-500">category</div>
              </li>
            ))}
            {productSearchResults.map(({ title, price, id }) => (
              <li
                onClick={() => {
                  router.push({
                    pathname: "/product",
                    query: { id: id },
                  });
                }}
                className="hover:bg-gray-100 p-2 text-white"
              >
                {title}{" "}
                <div className="text-yellow-500"> product price: {price} </div>
              </li>
            ))}
          </ul>
        )}
    </header>
  );
}

export default Header;
