import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-24 px-4 sm:px-12 lg:px-20 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="text-2xl mb-8">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-6">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 sm:gap-6 flex-1">
                <img
                  className="w-20 sm:w-24 rounded-lg object-cover"
                  src={productData.image}
                  alt={productData.name}
                />
                <div className="flex flex-col justify-between">
                  <p className="text-gray-900 text-sm sm:text-lg font-semibold">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-gray-800 font-medium">
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 py-1 border rounded bg-gray-100 text-sm">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === 0
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border rounded px-2 py-1 w-20 text-center text-sm sm:text-base focus:outline-orange-400"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              {/* Delete Button */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:scale-110 transition-transform"
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total & Checkout */}
      <div className="flex justify-end mt-12">
        <div className="w-full sm:w-[450px] flex flex-col gap-4">
          <CartTotal />
          <button
            onClick={() => navigate("/place-order")}
            className="bg-black text-white text-sm sm:text-base py-3 px-6 rounded-lg hover:bg-gray-800 transition-all"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
