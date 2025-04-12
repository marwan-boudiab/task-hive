import Board from "../models/BoardModel.js";
import { Types } from "mongoose";

// Controller function to get all boards for the authenticated user
const getBoard = async (req, res) => {
  // Extract user ID from the request object
  const user_id = req.user._id;

  // Find the board associated with the user, sorted by creation date in descending order
  const boards = await Board.findOne({ user_id }).sort({ createdAt: -1 });

  // Respond with the boards data
  res.status(200).json(boards);
};

/*// get a single board
// const getBoard = async (req, res) => {
//   const { boardId } = req.params;

//   if (!Types.ObjectId.isValid(boardId)) {
//     return res.status(404).json({ error: "No such board" });
//   }

//   const board = await Board.findById(boardId);
//   if (!board) {
//     return res.status(404).json({ error: "No such board" });
//   }
//   res.status(200).json(board);
// };*/

// Controller function to create a new board
const createBoard = async (req, res) => {
  // Extract tasks from the request body
  const { tasks } = req.body;

  try {
    // Extract user ID from the request object
    const user_id = req.user._id;

    // Create a new board document in the database
    const board = await Board.create({ user_id, tasks });

    // Respond with the newly created board data
    res.status(200).json(board);
  } catch (err) {
    // Respond with an error message if there was an issue creating the board
    res.status(400).json({ error: err.message });
  }
};

// Controller function to delete a board
const deleteBoard = async (req, res) => {
  // Extract user ID from the request object
  const user_id = req.user._id;

  // Find and delete the board associated with the user
  const board = await Board.findOneAndDelete({ user_id: user_id });

  // If the board does not exist, respond with a 404 error
  if (!board) {
    return res.status(404).json({ error: "No such board" });
  }

  // Respond with the deleted board data
  res.status(200).json(board);
};

// Controller function to update a board
const updateBoard = async (req, res) => {
  // Extract user ID from the request object
  const user_id = req.user._id;

  // Find and update the board associated with the user using the data from the request body
  const board = await Board.findOneAndUpdate(
    { user_id: user_id },
    { ...req.body }
  );

  // If the board does not exist, respond with a 400 error
  if (!board) {
    return res.status(400).json({ error: "No such board" });
  }

  // Respond with the updated board data
  res.status(200).json(board);
};

export { getBoard, createBoard, deleteBoard, updateBoard };
