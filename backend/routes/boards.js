import { Router } from "express";
import {
  createBoard,
  getBoard,
  // getBoards,
  deleteBoard,
  updateBoard,
} from "../controllers/boardController.js";
import {
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { requireAuth } from "../middleware/requireAuth.js";

// Create an instance of an Express Router
const boardsRoutes = Router();

// Middleware to require authentication for all routes in this router
boardsRoutes.use(requireAuth);

// Route to handle GET requests to fetch all boards
boardsRoutes.get("/", getBoard);

// Route to handle POST requests to create a new board
boardsRoutes.post("/", createBoard);

// Route to handle POST requests to create a new task within a specific column of a board
boardsRoutes.post("/:columnId/task", createTask);

// Route to handle DELETE requests to delete a board
boardsRoutes.delete("/", deleteBoard);

// Route to handle DELETE requests to delete a specific task from a specific column of a board
boardsRoutes.delete("/:columnId/tasks/:taskId", deleteTask);

// Route to handle PATCH requests to update a board
boardsRoutes.patch("/", updateBoard);

// Route to handle PATCH requests to update a specific task within a specific column of a board
boardsRoutes.patch("/:columnId/tasks/:taskId", updateTask);

export default boardsRoutes;
