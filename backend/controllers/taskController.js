import { model } from "mongoose";

// Define Mongoose models for Board and Task
const Board = model("Board");
const Task = model("Task");

// Controller function to delete a task
const deleteTask = async (req, res) => {
  try {
    // Extract columnId and taskId from request parameters
    const { columnId, taskId } = req.params;

    // Find the board associated with the current user
    const user_id = req.user._id;
    const board = await Board.findOne({ user_id: user_id });

    // If the board is not found, return a 404 status with a message
    if (!board) return res.status(404).json({ message: "Board not found" });

    // Find the index of the task to be deleted within the specified column
    const taskIndex = board.tasks[columnId].items.findIndex(
      (task) => task._id.toString() === taskId
    );
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove the task from the board's tasks array
    board.tasks[columnId].items.splice(taskIndex, 1);

    // Save the updated board to the database
    await board.save();

    // Return a success message
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    // Log the error and return a 500 status with a message
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to create a new task
const createTask = async (req, res) => {
  try {
    // Extract columnId from request parameters and task data from request body
    const { columnId } = req.params;
    const taskData = req.body;

    // Find the board associated with the current user
    const user_id = req.user._id;
    const board = await Board.findOne({ user_id: user_id });

    // If the board is not found, return a 404 status with a message
    if (!board) return res.status(404).json({ message: "Board not found" });

    // Create a new task instance with the provided data
    const newTask = new Task(taskData);

    // Add the new task to the specified column's tasks array
    board.tasks[columnId].items.push(newTask);

    // Save the updated board to the database
    await board.save();

    // Return a success message along with the new task data
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (err) {
    // Log the error and return a 500 status with a message
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to update a task
const updateTask = async (req, res) => {
  try {
    // Extract taskId and columnId from request parameters and update data from request body
    const { taskId, columnId } = req.params;
    const update = req.body;

    // Find the board associated with the current user
    const user_id = req.user._id;
    const board = await Board.findOne({ user_id: user_id });

    // If the board is not found, return a 404 status with a message
    if (!board) return res.status(404).json({ message: "Board not found" });

    // Find the index of the task to be updated within the specified column
    const taskIndex = board.tasks[columnId].items.findIndex(
      (task) => task._id.toString() === taskId
    );
    if (taskIndex === -1)
      return res.status(404).json({ message: "Task not found" });

    // Update the task with the new data
    const updatedTask = {
      ...board.tasks[columnId].items[taskIndex],
      ...update,
    };
    board.tasks[columnId].items.set(taskIndex, updatedTask);

    // Save the updated board to the database
    await board.save();

    // Return a success message along with the updated task data
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    // Log the error and return a 500 status with a message
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createTask, updateTask, deleteTask };
