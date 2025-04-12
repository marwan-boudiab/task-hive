import { Schema as _Schema, model } from "mongoose";
import { genSalt, hash as _hash, compare } from "bcrypt";
import validator from "validator";
const Schema = _Schema; // Alias for Schema to avoid naming conflicts

// Define the user schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true }, // Email field with validation for required and unique properties
  password: { type: String, required: true }, // Password field with validation for required property
});

// Define static methods for the user schema

// Static method for user signup
userSchema.statics.signup = async function (email, password) {
  // Validation checks for email and password
  if (!email || !password) throw Error("All fields must be filled");
  if (!validator.isEmail(email)) throw Error("Email is not valid");

  // Check if email already exists in the database
  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email already in use");
  }

  if (!validator.isStrongPassword(password))
    throw Error("Password not strong enough");

  // Hash the password using bcrypt
  const salt = await genSalt(10); // Generate salt for hashing
  const hash = await _hash(password, salt); // Hash the password

  // Create a new user document with the hashed password
  const user = await this.create({ email, password: hash });

  return user;
};

// Static method for user login
userSchema.statics.login = async function (email, password) {
  // Validation checks for email and password
  if (!email || !password) throw Error("All fields must be filled");

  // Find the user by email in the database
  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email"); // If user not found, throw error

  // Compare the provided password with the hashed password stored in the database
  const match = await compare(password, user.password);

  if (!match) throw Error("Incorrect password"); // If passwords don't match, throw error

  return user;
};

// Create the User model using the user schema
const User = model("User", userSchema);

export default User;
