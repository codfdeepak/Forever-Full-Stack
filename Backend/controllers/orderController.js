import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

// placing order using cod method( cash on delivery)
const placeOrder = async (req, res) => {
  try {

    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      address,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      date :Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} })
    
    res.json({ success: true, message: "Order Placed" })
    
    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
  
}




// Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {
  
}

//global variable 
const currency = 'inr'
const deliveryCharge = 10



// gateway initialize
const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Placing order using RazorPay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

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

    const options = {
      amount: amount*100 ,       // paise me
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

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body
    const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id)
    console.log(orderInfo)
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.json({success:true,message:"Payment Successfull"})
    } else {
      res.json({success:false,message:"Payment Failed"})
    }
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
    
  }
  
}


// All orders data for admin Panel
const allOrders = async (req, res) => {
  
  try {
    const orders = await orderModel.find({})
    res.json({success:true,orders})
    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}

// User Order Data for Frontend 
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body
    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })
    
    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
  
}

// Update order status from  Amdin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({success:true,message:"Status Updated"})
    
  } catch (error) {
     console.log(error)
      res.json({success:false,message:error.message})
    
  }
  
}

export { verifyRazorpay,placeOrder, placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}