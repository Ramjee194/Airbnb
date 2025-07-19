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
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()
const port = process.env.PORT || 6000

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/listing", listingRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/bookings", bookingRouter);

// ---- Serve frontend static files ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
// --------------------------------------

app.listen(port, () => {
    connectDB()
    console.log("server is runing ");
})
