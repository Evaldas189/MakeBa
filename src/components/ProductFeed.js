import { useEffect, useState } from "react";
import Spinner from "../svg/Spinner";
import LoginModal from "./LoginModal";
import Product from "./Product";
import {
  AdjustmentsIcon
} from "@heroicons/react/outline";
import { selectFilter } from "../slices/filterSlice";
import { selectCategories } from "../slices/userSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { resetFilter, applyFilter } from "../slices/filterSlice";
import NoProducts from "./NoProducts";
import product from "../pages/product";

function ProductFeed({ products, searchValue, setOpenFilter, openFilter }) {

  const [sortedProducts, setSortedProducts] = useState(products);
  const filter = useSelector(selectFilter);
  const categories = useSelector(selectCategories)
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [descriptions, setDescriptions] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
   console.log(categories)
  }, [])

  useEffect(() => {
    let newProducts = [...products];
    if (searchValue !== "" && !openFilter) {
      newProducts = newProducts.filter((a) =>
        a.category.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if(searchValue === ""){
      newProducts = [...products]
    }
    if(newProducts.length === 0){
      newProducts = [...products]
    }
    setSortedProducts(newProducts);
  }, [searchValue])

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
          if (newProducts.length > 0) {
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

      if(products === newProducts){
        setDescriptions(false)
      }
      
      setLoading(true);
      setSortedProducts(newProducts);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }   
   }, [filter])

   useEffect(() => {
     dispatch(resetFilter())
   }, [router])


  return (
    <>
      {!openFilter && descriptions && (
        <div className="flex mx-auto flex-col mainGrid">
          <h1 className="text-white text-xl font-semibold pt-8 pb-2 ml-2">
            Recommended for you
          </h1>
          <div className="relative grid-flow-row-dense grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
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
      <div className="flex mx-auto mainGrid flex-col">
        {!openFilter && descriptions && (
          <h1 className="text-white text-xl font-semibold pt-6 pb-2 ml-2">
            Newest products
          </h1>
        )}

        <div className="mainGrid relative grid-flow-row-dense grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
          <div
            onClick={() => {
              dispatch(
                applyFilter({ key: "keyword", value: router?.query?.category })
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
                  src="https://cdn.buyee.jp/sliderbanner/amazon_amazonTopImage/en/1/index_en.png"
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
      </div>
    </>
  );
}

export default ProductFeed;
