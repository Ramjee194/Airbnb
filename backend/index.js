import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.route.js'
import listingRouter from './routes/listing.route.js'
import bookingRouter from './routes/booking.route.js'
import wishlistRoutes from './routes/wishlist.routes.js';
import reviewRouter from './routes/review.routes.js'



dotenv.config()
const port = process.env.PORT || 6000

const app = express()



//  Allow requests from any origin (for development)
app.use(cors({
  origin: 'https://airbnb-1-ui1y.onrender.com', // ✅ no trailing slash
  credentials: true
}));




app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/listing", listingRouter)

app.use("/api/wishlist", wishlistRoutes);
app.use("/api/bookings", bookingRouter);
app.use("/api/review", reviewRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});



app.listen(port, () => {
    connectDB()
    console.log("server is runing ");

})
