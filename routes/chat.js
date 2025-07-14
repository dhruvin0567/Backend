import express from "express";
import { askChatGPT } from "../controllers/chatController.js";
import { useState } from "react";

const router = express.Router();

router.post("/chat", askChatGPT);

export default router;
