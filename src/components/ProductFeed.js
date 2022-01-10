import { useEffect, useState } from "react";
import Spinner from "../svg/Spinner";
import Product from "./Product";
import {
  AdjustmentsIcon,
  EmojiSadIcon
} from "@heroicons/react/outline";
import { selectFilter } from "../slices/filterSlice";
import { selectCategories } from "../slices/userSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { resetFilter, applyFilter } from "../slices/filterSlice";

function ProductFeed({ products, searchValue, setOpenFilter, openFilter }) {

  const [sortedProducts, setSortedProducts] = useState(products);
  const filter = useSelector(selectFilter);
  const categories = useSelector(selectCategories)
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   window.history.pushState('', 'MakeBa', '/');
  // }, [])
  useEffect(() => {
    dispatch(resetFilter())
  }, [router])

  useEffect(() => {
    console.log(router)
   if(router.asPath.includes("?category")){
    dispatch(resetFilter())
   }
  }, [router])

  useEffect(() => {
    
    if(filter.keyword === undefined || filter.keyword === ""){
    let newProducts = [...products];
    if (searchValue !== "" && !openFilter) {
      newProducts = newProducts.filter((a) =>
        a.category.toLowerCase().includes(searchValue.toLowerCase()) || a.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if(searchValue === ""){
      newProducts = [...products]
    }
    if(newProducts.length === 0){
      newProducts = [...products]
    }
    setSortedProducts(newProducts);
    }
  }, [searchValue, filter])

   useEffect(() => {
    let newProducts = [...products];
    if (filter && openFilter) {
      if (
        (filter?.keyword === "" || filter?.keyword === undefined) &&
        filter?.minValue === "" &&
        filter?.maxValue === "" &&
        filter?.sort === ""
      ) {
        newProducts = products
      } else {
        if (filter?.keyword !== "" && filter?.keyword !== undefined) {
          let arr2;
          newProducts = products.filter((product) =>
            product.title.toLowerCase().includes(filter?.keyword?.toLowerCase())
          );
          arr2 = products.filter((product) =>
            product.category.toLowerCase().includes(filter?.keyword?.toLowerCase())
          );
          if (newProducts.length > arr2.length) {
            newProducts.concat(arr2);
          }
          else{
            newProducts = arr2
          }
        }
        if (filter?.minValue !== "") {
          newProducts = newProducts.filter(
            (product) => parseInt(product.price) >= parseInt(filter.minValue)
          );
        }
        if (filter?.maxValue !== "") {
          newProducts = newProducts.filter(
            (product) => parseInt(product.price) <= parseInt(filter.maxValue)
          );
        }
        if (filter?.sort !== "") {
          if (filter.sort === "1") {
            newProducts.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
          }
          else if (filter.sort === "2") {
            newProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
          }
          else if (filter.sort === "3") {
            newProducts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
          }
          else{
            newProducts.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
          }
        }
      }
      setLoading(true);
      setSortedProducts(newProducts);
      setTimeout(() => {
        setLoading(false);
      }, 800);
      //  window.history.pushState('', 'MakeBa', '/');

    }   
   }, [filter])

  return (
    <>
      {!openFilter &&
        (filter.keyword === "" || filter.keyword === undefined) &&
        filter.minValue === "" &&
        filter.maxValue === "" &&
        filter.sort === "" &&
        (!router.query.category || router.query.category === "") && (
          <div className="flex mx-auto flex-col mainGrid">
            {categories && <h1 className="text-white text-xl font-semibold pt-4 pb-2 ml-4">
              Recommended for you
            </h1>}
            <div className="mainGrid relative grid-flow-row-dense grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-1">
              {products
                .filter((product) => product.category === categories)
                .sort(() => Math.random() - Math.random())
                .slice(0, 4)
                .map(({ id, title, price, desc, category, images }, index) => (
                  <Product
                    index={index}
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    desc={desc}
                    category={category}
                    images={images[0]}
                  />
                ))}
            </div>
          </div>
        )}
      <div className="flex mx-auto mainGrid flex-col pb-4">
        {!openFilter &&
        (filter.keyword == "" || filter.keyword == undefined) &&
        filter.minValue === "" &&
        filter.maxValue === "" &&
        filter.sort === "" &&
        (!router.query.category || router.query.category === "") ? (
          <h1 className="text-white text-xl font-semibold pt-4 pb-2 ml-4">
            Newest products
          </h1>
        ) : (
          <h1
            className={`${
              sortedProducts.length === 0 ? "hidden" : "block"
            } text-white text-xl font-semibold pt-4 pb-2 ml-4`}
          >
            Search results: <span className="text-red-400 font-medium">{router?.query?.category && filter.keyword ? filter.keyword : filter.keyword ? filter.keyword : router?.query?.category && !filter.keyword ? router?.query?.category : "" } </span>
          </h1>
        )}

        <div className="mainGrid relative grid-flow-row-dense grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-1">
          <div
            onClick={() => {
              router?.query?.category &&
                dispatch(
                  applyFilter({
                    key: "keyword",
                    value: router?.query?.category && filter.keyword ? filter.keyword : filter.keyword ? filter.keyword : router?.query?.category && !filter.keyword ? router?.query?.category : "",
                  })
                ),
                setOpenFilter(true);
            }}
            className="filter-button cursor-pointer fixed z-40 top-1/2 -left-2 h-14  rounded-r-full"
          >
            <AdjustmentsIcon
              className="h-9 p-2 transform rotate-90"
              style={{ marginTop: 10 }}
            />
          </div>
          {!loading ? (
            <>
              {sortedProducts
                ?.slice(0, 5)
                .map(({ id, title, price, desc, category, images }, index) => (
                  <Product
                    index={index}
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    desc={desc}
                    category={category}
                    images={images[0]}
                  />
                ))}
              {sortedProducts.length >= 8 && (
                <img
                  className="hidden md:block md:col-span-full"
                  src="/images/add.png"
                  alt=""
                />
              )}

              {sortedProducts
                ?.slice(5, products.length)
                .map(({ id, title, price, desc, category, images }, index) => (
                  <Product
                    index={index}
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    desc={desc}
                    category={category}
                    images={images[0]}
                  />
                ))}
            </>
          ) : (
            <Spinner />
          )}
        </div>
        {sortedProducts.length === 0 && (
          <div className="text-white text-center justify-center flex flex-col items-center text-4xl mx-4 my-48">
            <EmojiSadIcon className=" h-24 mb-6" />
            <p className="text-4xl">
              We could not find anything related to:{" "}
              <span className="text-red-400">{filter.keyword}</span>
            </p>
            <p className="text-xl mt-4">Try changing your request...</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductFeed;
