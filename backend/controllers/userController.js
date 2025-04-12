import Board from "../models/BoardModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Function to create a JWT token with the user's _id
const createToken = (_id) => {
  // Create a token with the user's _id, using the secret from environment variables and setting an expiration time of 3 days
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Controller function to handle user login
const loginUser = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Attempt to log in the user using the email and password
    const user = await User.login(email, password);

    // Create a JWT token for the logged-in user
    const token = createToken(user._id);

    // Respond with the user's email and token
    res.status(200).json({ email, token });
  } catch (error) {
    // If there's an error during login, respond with a 400 status and the error message
    res.status(400).json({ error: error.message });
  }
};

// Controller function to handle user signup
const signupUser = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Create a new user with the provided email and password
    const user = await User.signup(email, password);

    // Create a board for the newly signed up user
    const board = await Board.create({ user_id: user._id });

    // Create a JWT token for the newly signed up user
    const token = createToken(user._id);

    // Respond with the user's email, token, and the created board
    res.status(200).json({ email, token, board });
  } catch (error) {
    // If there's an error during signup, respond with a 400 status and the error message
    res.status(400).json({ error: error.message });
  }
};

export { loginUser, signupUser };
