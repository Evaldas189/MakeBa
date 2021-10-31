import { useEffect, useState } from "react";
import Spinner from "../svg/Spinner";
import LoginModal from "./LoginModal";
import Product from "./Product";

function ProductFeed({ products, searchValue }) {

  const [modalOpen, setModalOpen] = useState(false);
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
    <div className="relative grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
      {sortedProducts
        .slice(0, 5)
        .map(({ id, title, price, desc, category, images }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            desc={desc}
            category={category}
            images={images[0]}
            openModal={setModalOpen}
          />
        ))}
      <img
        className="md:col-span-full"
        src="https://cdn.buyee.jp/sliderbanner/amazon_amazonTopImage/en/1/index_en.png"
        alt=""
      />

      {sortedProducts
        .slice(5, products.length)
        .map(({ id, title, price, desc, category, images }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            desc={desc}
            category={category}
            images={images[0]}
            openModal={setModalOpen}
          />
        ))}
      <LoginModal
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </div>
  );
}

export default ProductFeed;
