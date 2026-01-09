import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="pt-26 pb-12 transition-opacity ease-in duration-200">
      {/* Product Section */}
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-1/6">
            {productData.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setImage(img)}
                className={`cursor-pointer rounded-md border ${
                  img === image
                    ? "border-orange-500 shadow-lg"
                    : "border-gray-200"
                } transition-all`}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1">
            <img
              src={image}
              alt="main-product"
              className="w-full h-[400px] md:h-[450px] rounded-md object-contain shadow-sm"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-2xl font-semibold text-gray-800">
            {productData.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <img
                  key={idx}
                  src={idx < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
            <span className="text-gray-500 pl-2">(122)</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-gray-900">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 md:w-4/5">{productData.description}</p>

          {/* Size Selection */}
          <div className="flex flex-col gap-2 mt-4">
            <span className="font-medium">Select Size:</span>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(s)}
                  className={`border px-3 py-1.5 rounded-md text-sm transition-all ${
                    s === size
                      ? "border-orange-500 bg-orange-50 font-semibold"
                      : "border-gray-300 bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white py-2 text-sm rounded-md hover:bg-gray-800 transition-all w-1/3"
          >
            ADD TO CART
          </button>

          {/* Product Info */}
          <div className="mt-4 text-sm text-gray-500 flex flex-col gap-1">
            <p>100% Original Products</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-12">
        <div className="flex border-b">
          <span className="px-6 py-3 text-sm font-medium border-r cursor-pointer">
            Description
          </span>
          <span className="px-6 py-3 text-sm cursor-pointer">
            Reviews (122)
          </span>
        </div>
        <div className="border p-6 text-gray-600 flex flex-col gap-4">
          <p>
            Experience unmatched quality with this product. Made from premium
            materials, designed to provide comfort and durability. Perfect for
            daily use or gifting purposes.
          </p>
          <p>
            Customer satisfaction guaranteed. Easy returns, cash on delivery,
            and responsive support make shopping worry-free.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
