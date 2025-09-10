import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import cors from "cors";
import Razorpay from "razorpay";
import chatRoute from "./routes/chat.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", chatRoute);
app.use("/api", paymentRoutes);

// checking a routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Brach 