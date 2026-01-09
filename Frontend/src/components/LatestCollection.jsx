import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="my-16 px-4 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="text-center mb-12">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
          Discover our newest arrivals curated just for you. From fashion to
          lifestyle, explore the latest trends with high quality products.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            className="hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      {/* Optional "View All" Button */}
      {/* <div className="flex justify-center mt-12">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 shadow-md">
          View All Products
        </button>
      </div> */}
    </section>
  );
};

export default LatestCollection;
