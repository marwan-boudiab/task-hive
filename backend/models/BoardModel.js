import { Schema, model } from "mongoose";
import Task from "./TaskModel.js";

// Define the board schema
const boardSchema = new Schema(
  {
    user_id: { type: String, required: true }, // User ID associated with the board
    tasks: { // Tasks field representing different task columns
      type: { // Define the structure of the tasks object
        backlog: { // Backlog column
          name: { type: String, default: "Backlog" }, // Column name (default: "Backlog")
          items: { type: [Task.schema], default: [] }, // Array of tasks (default: empty array)
        },
        pending: { // Pending column
          name: { type: String, default: "Pending" }, // Column name (default: "Pending")
          items: { type: [Task.schema], default: [] }, // Array of tasks (default: empty array)
        },
        todo: { // To Do column
          name: { type: String, default: "To Do" }, // Column name (default: "To Do")
          items: { type: [Task.schema], default: [] }, // Array of tasks (default: empty array)
        },
        doing: { // Doing column
          name: { type: String, default: "Doing" }, // Column name (default: "Doing")
          items: { type: [Task.schema], default: [] }, // Array of tasks (default: empty array)
        },
        done: { // Done column
          name: { type: String, default: "Done" }, // Column name (default: "Done")
          items: { type: [Task.schema], default: [] }, // Array of tasks (default: empty array)
        },
      },
      default: { // Default value for tasks object (empty columns)
        backlog: { name: "Backlog", items: [] }, // Backlog column with empty items array
        pending: { name: "Pending", items: [] }, // Pending column with empty items array
        todo: { name: "To Do", items: [] }, // To Do column with empty items array
        doing: { name: "Doing", items: [] }, // Doing column with empty items array
        done: { name: "Done", items: [] }, // Done column with empty items array
      },
    },
  },
  { timestamps: true } // Enable timestamps to automatically add createdAt and updatedAt fields
);

// Create the Board model using the board schema
const Board = model("Board", boardSchema);

export default Board;
