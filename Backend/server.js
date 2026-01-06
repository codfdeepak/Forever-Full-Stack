import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import express from 'express'
import productRouter from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

// middlewares 
app.use(express.json())
// app.use(express.urlencoded({ extended: true })); // OPTIONAL but recommended

app.use(cors())

// api endpoints

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRoute);
app.use('/api/order/',orderRouter)

app.get('/', (req,res) => {
  res.send("API working");
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})