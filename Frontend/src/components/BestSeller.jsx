import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <section className="my-16 px-4 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="text-center mb-12">
        <Title text1="BEST" text2="SELLERS" />
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
          Check out our most popular products loved by our customers.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            className="hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
