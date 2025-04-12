import { Router } from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

// Create an instance of an Express Router
const router = Router();

// Route to handle POST requests for user login
router.post("/login", loginUser);

// Route to handle POST requests for user signup
router.post("/signup", signupUser);

export default router;
