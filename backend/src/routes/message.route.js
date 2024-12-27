import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";
import {
  createGroup,
  getGroups,
  sendMessageToGroup,
} from "../controllers/group.controller.js";

const router = express.Router();

// User message routes
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

// Group routes
router.post("/groups", protectRoute, createGroup); // Create a new group
router.get("/groups", protectRoute, getGroups); // Get groups for the logged-in user
router.post("/groups/:id/messages", protectRoute, sendMessageToGroup); // Send a message to a specific group

export default router;
