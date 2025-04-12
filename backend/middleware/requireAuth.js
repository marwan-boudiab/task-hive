import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Middleware function to require authentication for protected routes
export const requireAuth = async (req, res, next) => {
  // Extract the authorization token from the request headers
  const { authorization } = req.headers;

  if (!authorization) {
    // If no authorization token is provided, respond with a 401 status and an error message
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Extract the token from the Authorization header (Bearer token)
  const token = authorization.split(" ")[1];

  try {
    // Verify the token using the secret key and extract the user's _id
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Find the user based on the extracted _id and select only the _id field
    req.user = await User.findOne({ _id }).select("_id");

    // Call the next middleware function in the chain
    next();
  } catch (error) {
    // If there's an error during token verification, respond with a 401 status and an error message
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
