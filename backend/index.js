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
import messageRouter from './routes/message.route.js'
import dashboardRouter from './routes/dashboard.routes.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import Message from './models/message.model.js'

dotenv.config()
const port = process.env.PORT || 8000

const app = express()

// Allow requests from any origin (for development)
const allowedOrigins = [
  "https://airbnb-1-ui1y.onrender.com", // ✅ deployed frontend
  "http://localhost:5173"               // ✅ dev frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/listing", listingRouter)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/bookings", bookingRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/review", reviewRouter)
app.use("/api/messages", messageRouter)
app.use("/api/dashboard", dashboardRouter)

app.get("/", (req, res) => {
  res.send("API is running...");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("🔌 User connected to socket:", socket.id);

  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    console.log(`👥 Socket ${socket.id} joined room: ${roomName}`);
  });

  socket.on("send_message", async (data) => {
    const { sender, receiver, text, listing } = data;
    try {
      const newMsg = await Message.create({ sender, receiver, text, listing });
      const chatRoom = [sender, receiver].sort().join("_");
      io.to(chatRoom).emit("receive_message", newMsg);
      
      // Also trigger a real-time notification socket event
      io.emit(`notification_${receiver}`, {
        type: "message",
        title: "New Message",
        text: `Message from recipient: "${text.substring(0, 30)}..."`,
        sender,
        createdAt: newMsg.createdAt
      });
    } catch (err) {
      console.error("Failed to save socket message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔌 User disconnected from socket:", socket.id);
  });
});

server.listen(port, () => {
    connectDB()
    console.log("server is running on port " + port);
});
