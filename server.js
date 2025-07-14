import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", chatRoute);

// checking a routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
