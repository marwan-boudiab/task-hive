import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import boardsRoutes from "./routes/boards.js";
import userRoutes from "./routes/user.js";

// import multer, { memoryStorage } from "multer";
// import jwt from "jsonwebtoken";

// Create an instance of the Express application
const app = express();

// upload middleware
// const storage = memoryStorage();
// const upload = multer({ storage });

// Enable CORS (Cross-Origin Resource Sharing) to allow requests from different origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(json());

// Custom middleware to log the request path and method to the console
app.use((req, res, next) => {
  // Log the request path and HTTP method
  console.log(req.path, req.method);

  // Call the next middleware or route handler in the stack
  next();
});

// Define routes for different parts of the application

// Route all requests starting with /api/boards to the boardsRoutes middleware
app.use("/api/boards", boardsRoutes);

// Route all requests starting with /api/users to the userRoutes middleware
app.use("/api/users", userRoutes);

// app.post("/api/images", upload.single("image"), (req, res) => {
//   const { file } = req;
//   const { authorization } = req.headers;

//   // console.log(file, authorization);
//   const token = authorization.split(" ")[1];
//   const { _id } = jwt.verify(token, process.env.SECRET);

//   if (!file || !_id) return res.status(400).json({ message: "Bad request" });
//   return res.send("sucess")
//   // const { error, key } = uploadToS3({ file, _id });
//   // if (error) return res.status(500).json({ message: error.message });

//   // return res.status(201).json({ key });
// });
//

// Connect to MongoDB using the connection string from environment variables
connect(process.env.MONGO_URI)
  .then(() => {
    // If the connection is successful, start the Express server
    app.listen(process.env.PORT, () => {
      // Log a message indicating successful connection and server startup
      console.log(`connected to db & listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    // If there's an error connecting to the database, log the error
    console.log(error);
  });

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Backend is working');
});
