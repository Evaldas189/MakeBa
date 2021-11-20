import { useEffect, useState } from "react";
import Spinner from "../svg/Spinner";
import LoginModal from "./LoginModal";
import Product from "./Product";
import {
  AdjustmentsIcon
} from "@heroicons/react/outline";

function ProductFeed({ products, searchValue, setOpenFilter }) {

  const [sortedProducts, setSortedProducts] = useState(products);

  useEffect(() => {
    let newProducts = [...sortedProducts];
    if (searchValue !== "") {
      newProducts.sort(
        (a, b) =>
          b.category.includes(searchValue) - a.category.includes(searchValue)
      );
    }
    setSortedProducts(newProducts);
  }, [searchValue])


  return (
    <div className="relative grid-flow-row-dense grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
      <div onClick={()=> setOpenFilter(true)} className="fixed z-40 top-1/2 -left-2 h-14 bg-red-600 rounded-r-full">
        <AdjustmentsIcon className="h-9 p-2 text-yellow-400 transform rotate-90" style={{marginTop: 10}}  />
      </div>
      {sortedProducts
        .slice(0, 5)
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
      <img
        className="hidden md:block md:col-span-full"
        src="https://cdn.buyee.jp/sliderbanner/amazon_amazonTopImage/en/1/index_en.png"
        alt=""
      />

      {sortedProducts
        .slice(5, products.length)
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
  );
}

export default ProductFeed;
