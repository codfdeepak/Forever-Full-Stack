import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

/* =========================
   PLACE ORDER - COD
   ========================= */
const placeOrder = async (req, res) => {
  try {
    // 🔐 userId auth middleware se
    const userId = req.userId;

    const { items, amount, address } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Unauthorized user" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // 🧹 clear cart after order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   STRIPE (future use)
   ========================= */
const placeOrderStripe = async (req, res) => {
  // Stripe logic later
};

/* =========================
   RAZORPAY CONFIG
   ========================= */
const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* =========================
   PLACE ORDER - RAZORPAY
   ========================= */
const placeOrderRazorpay = async (req, res) => {
  try {
    // 🔐 userId from middleware (NOT body)
    const userId = req.userId;
    const { items, amount, address } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Unauthorized user" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Razorpay order create
    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await razorPayInstance.orders.create(options);

    res.json({
      success: true,
      order: razorpayOrder,
    });
  } catch (error) {
    console.log("Razorpay Error:", error);
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   VERIFY RAZORPAY PAYMENT
   ========================= */
const verifyRazorpay = async (req, res) => {
  try {
    // 🔐 userId from middleware
    const userId = req.userId;
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorPayInstance.orders.fetch(
      razorpay_order_id
    );

    if (orderInfo.status === "paid") {
      // mark payment true
      await orderModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });

      // clear cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   ALL ORDERS (ADMIN)
   ========================= */
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   USER ORDERS (FRONTEND)
   ========================= */
const userOrders = async (req, res) => {
  try {
    // 🔐 only logged-in user's orders
    const orders = await orderModel.find({
      userId: req.userId,
    });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   UPDATE ORDER STATUS (ADMIN)
   ========================= */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
