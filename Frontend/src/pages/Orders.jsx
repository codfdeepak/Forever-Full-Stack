import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-24 px-4 sm:px-12 lg:px-20 bg-gray-50 min-h-screen">
      <div className="text-3xl font-semibold mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="flex flex-col gap-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:shadow-lg"
          >
            {/* Product Info */}
            <div className="flex items-start gap-4 sm:gap-6 flex-1">
              <img
                className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded-md"
                src={item.image[0]}
                alt={item.name}
              />
              <div className="flex flex-col gap-1">
                <p className="text-base sm:text-lg font-medium text-gray-800">
                  {item.name}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-gray-700 text-sm sm:text-base">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="text-gray-500 text-sm sm:text-base">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="text-gray-500 text-sm sm:text-base">
                  Payment:{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Status & Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    item.status === "Delivered"
                      ? "bg-green-500"
                      : item.status === "Pending"
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                  }`}
                ></span>
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  {item.status}
                </p>
              </div>
              <button
                onClick={loadOrderData}
                className="px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 transition-all"
              >
                Trace Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
