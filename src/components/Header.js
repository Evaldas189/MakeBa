import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  XIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { useEffect, useRef, useState } from "react";
import UserIcon from "../svg/UserIcon";
import Account from "./Account";
import Currency from "react-currency-formatter";

const categories = [
  "Electronics",
  "Pet Supplies",
  "Automotive and Car Care",
  "Arts and Crafts",
  "Toys & Games",
  "Beauty & Personal Care",
  "Home & kitchen",
];

function Header({ setSearchValue, searchValue, products, openFilter }) {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [productSearchResults, setProductSearchResults] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [HoverAccount, setHoverAccount] = useState(false);
  const [hoverLogin, setHoverLogin] = useState(false);

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
                setSearchTerm("");
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
                setSearchTerm("");
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
            <input
              spellcheck="false"
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
                  } bg-white border max-h-96 overflow-x-hidden z-50 border-t absolute top-9 w-full border-gray-400 rounded-b-md`}
                >
                  {searchResults.map((item) => (
                    <li
                      onClick={() => {
                        setSearchTerm("");
                        !router.pathname === "/checkout" ||
                        !router.pathname === "/orders"
                          ? setSearchValue(item)
                          : router.push(
                              {
                                pathname: "/",
                                query: { category: item },
                              },
                            );
                      }}
                      className="hover:bg-gray-100 p-2 h-30 flex border-b border-gray flex-row justify-between items-center"
                    >
                      <p>{item}</p>{" "}
                      <div className="text-yellow-600 mr-2"> category </div>
                    </li>
                  ))}
                  {productSearchResults.map(({ title, price, id, images }) => (
                    <li
                      onClick={() => {
                        setSearchTerm("");
                        router.push({
                          pathname: "/product",
                          query: { id: id },
                        });
                      }}
                      className="hover:bg-gray-100 p-2 flex flex-row border-b border-gray justify-between"
                    >
                      <div className="flex flex-row items-end w-3/4">
                        <div
                          style={{ minWidth: 56 }}
                          className="h-16 flex justify-center items-center"
                        >
                          <img
                            src={images[0]}
                            className="min-w-16 h-16 rounded-sm"
                            objectFit="contain"
                          />
                        </div>
                        <p className="mb-2 ml-4">{title}</p>
                      </div>
                      <div className="text-yellow-600 text-lg flex items-center mb-2 mr-2">
                        <Currency quantity={price} currency="EUR"></Currency>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
          </div>
          <div className="text-white flex items-center text-sm font-medium space-x-6 mx-3 md:mx-6 whitespace-nowrap">
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
              <span style={{width: 18, height: 18}} className="absolute top-0 right-0 md:right-10 mr-1 bg-yellow-400 text-center rounded-full text-black font-bold">
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
                    onMouseEnter={() => setHoverLogin(true)}
                    onMouseLeave={() => setHoverLogin(false)}
                    className="hidden sm:flex flex-row justify-center items-center cursor-pointer hover:text-yellow-400"
                  >
                    <svg
                      fill={`${
                        hoverLogin
                          ? "rgba(251, 191, 36, var(--tw-text-opacity))"
                          : "white"
                      }`}
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                    </svg>
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
                <div className="flex flex-row justify-center relative items-center">
                  {showAccountModal && (
                    <Account setOpenModal={setShowAccountModal} />
                  )}
                  <div
                    onMouseEnter={() => setHoverAccount(true)}
                    onMouseLeave={() => setHoverAccount(false)}
                    onClick={() => setShowAccountModal(true)}
                    className="flex flex-row justify-center relative items-center cursor-pointer"
                  >
                    <svg
                      fill={`${
                        HoverAccount
                          ? "rgba(251, 191, 36, var(--tw-text-opacity))"
                          : "white"
                      }`}
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                    </svg>
                    <p
                      className={` ${
                        HoverAccount ? "text-yellow-400" : ""
                      } hidden sm:block mr-1 mt-2 ml-1`}
                    >
                      Account
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
          className={`shop-menu flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center md:text-center text-white text-sm space-x-3 p-2 pl-8 ${
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
                  spellcheck="false"
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
                  <>
                    <SearchIcon
                      className="absolute h-6 top-2 text-white -left-6"
                      style={{ marginTop: 1, marginRight: -3 }}
                    />
                    <XIcon
                      onClick={() => setOpenSearchBar(false)}
                      className="absolute h-8 text-white top-2 right-1"
                      style={{ marginTop: -3 }}
                    />
                  </>
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
          className={`block w-full flex-grow md:flex md:items-center md:w-auto `}
        >
          <div className="text-sm sm:flex-grow">
            <a
              className="block cursor-pointer mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 active:text-red-400"
              onClick={() => {
                !router.pathname === "/checkout" ||
                !router.pathname === "/orders"
                  ? setSearchValue("Electronics")
                  : router.push({
                      pathname: "/",
                      query: { category: "Electronics" },
                    });
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
                  : router.push({
                      pathname: "/",
                      query: { category: "Home & kitchen" },
                    });
              }}
            >
              Home & kitchen
            </a>
            <a
              className="block cursor-pointer mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 active:text-red-400"
              onClick={() => {
                !router.pathname === "/checkout" ||
                !router.pathname === "/orders"
                  ? setSearchValue("Automotive and Car Care")
                  : router.push({
                      pathname: "/",
                      query: { category: "Automotive and Car Care" },
                    });
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
                  : router.push({
                      pathname: "/",
                      query: { category: "Arts and Crafts" },
                    });
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
                  : router.push({
                      pathname: "/",
                      query: { category: "Toys & Games" },
                    });
              }}
            >
              Toys & Games
            </a>
            <a
              className="block cursor-pointer mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 active:text-red-400"
              onClick={() => {
                !router.pathname === "/checkout" ||
                !router.pathname === "/orders"
                  ? setSearchValue("Pet Supplies")
                  : router.push({
                      pathname: "/",
                      query: { category: "Pet Supplies" },
                    });
              }}
            >
              Pet Supplies
            </a>
            <a
              className="block cursor-pointer mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-6 active:text-red-400"
              onClick={() => {
                !router.pathname === "/checkout" ||
                !router.pathname === "/orders"
                  ? setSearchValue("Beauty & Personal Care")
                  : router.push({
                      pathname: "/",
                      query: { category: "Beauty & Personal Care" },
                    });
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
            style={{ backgroundColor: "white", marginTop: 3 }}
            className={`dropdown ${
              openSearch ? "block" : "hidden"
            }  max-h-96 overflow-x-hidden z-50 p-0 fixed top-14 w-full border-b border-black`}
          >
            {searchResults.map((item) => (
              <li
                onClick={() => {
                  setSearchTerm("");
                  setOpenSearchBar(false);
                  !router.pathname === "/checkout" ||
                  !router.pathname === "/orders"
                    ? setSearchValue(item)
                    : router.push(
                        {
                          pathname: "/",
                          query: { category: item },
                        },
                      );
                }}
                className="hover:bg-gray-100 p-2  border-b border-gray text-black active:bg-transparent flex flex-row justify-between"
              >
                <p className="ml-1">{item}</p>
                <div className="text-yellow-500 mr-1">category</div>
              </li>
            ))}
            {productSearchResults.map(({ title, price, id, images }) => (
              <li
                onClick={() => {
                  setOpenSearchBar(false);
                  setSearchTerm("");
                  router.push({
                    pathname: "/product",
                    query: { id: id },
                  });
                }}
                className="hover:bg-gray-100 p-2 text-black border-b border-gray flex flex-row justify-between"
              >
                <div className="flex flex-row items-end w-3/4">
                  <div
                    style={{ minWidth: 56 }}
                    className="h-16 flex justify-center items-center"
                  >
                    <img
                      src={images[0]}
                      className="min-w-14 h-14 rounded-sm"
                      objectFit="contain"
                    />
                  </div>
                  <p className="mb-2 ml-4 line-clamp-2">{title}</p>
                </div>
                <div className="text-yellow-500 text-md flex-nowrap flex items-center mb-2 mr-1">
                  <Currency quantity={price} currency="EUR"></Currency>
                </div>
              </li>
            ))}
          </ul>
        )}
    </header>
  );
}

export default Header;
