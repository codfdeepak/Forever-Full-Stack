import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Order Page</h3>

      {orders.map((order, index) => (
        <div
          key={index}
          className="
            grid
            w-full
            grid-cols-1
            sm:grid-cols-[0.5fr_2fr_1fr_0.7fr_0.8fr]
            gap-4
            items-start
            border-2 border-gray-200
            p-5 md:p-8
            my-4
            text-xs sm:text-sm
            text-gray-700
          "
        >
          {/* ===== Image ===== */}
          <img src={assets.parcel_icon} alt="parcel" className="w-12 mx-auto" />

          {/* ===== Items + Address ===== */}
          <div className="min-w-0">
            {order.items.map((item, i) => (
              <p className="py-0.5 break-words" key={i}>
                {item.name} x {item.quantity}
                <span className="text-gray-500"> {item.size}</span>
                {i !== order.items.length - 1 && ","}
              </p>
            ))}

            <p className="mt-3 mb-1 font-medium">
              {order.address.firstName} {order.address.lastName}
            </p>

            <p>{order.address.street},</p>
            <p>
              {order.address.city}, {order.address.state},{" "}
              {order.address.country} - {order.address.zipcode}
            </p>

            <p className="mt-1">{order.address.phone}</p>
          </div>

          {/* ===== Order Info ===== */}
          <div>
            <p className="text-sm sm:text-[15px]">
              Items : {order.items.length}
            </p>
            <p className="mt-3">Method : {order.paymentMethod}</p>
            <p>Payment : {order.payment ? "Done" : "Pending"}</p>
            <p>Date : {new Date(order.date).toLocaleDateString()}</p>
          </div>

          {/* ===== Amount ===== */}
          <p className="text-sm sm:text-[15px] font-semibold">
            {currency} {order.amount}
          </p>

          {/* ===== Status ===== */}
          <select
            value={order.status}
            onChange={(event) => statusHandler(event, order._id)}
            className="border rounded px-2 py-1 text-sm outline-none bg-white"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Orders;
