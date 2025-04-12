import { Schema, model } from "mongoose";

// Define the task schema
const schema = new Schema(
  {
    title: { type: String, required: true }, // Title field with validation for required property
    description: { type: String, required: true }, // Description field with validation for required property
    priority: { type: String, required: true }, // Priority field with validation for required property
    deadline: { type: Number, required: true }, // Deadline field with validation for required property
    image: { type: String }, // Image field (optional)
    assignee: { type: String }, // Assignee field (optional)
    tags: [ // Tags field, an array of objects
      {
        title: { type: String, required: true }, // Title field for the tag with validation for required property
        color: { // Color object for the tag
          bg: { type: String, required: true }, // Background color field with validation for required property
          text: { type: String, required: true }, // Text color field with validation for required property
          _id: false,
        },

        _id: false,
      },
    ],
  },
  { timestamps: true } // Enable timestamps to automatically add createdAt and updatedAt fields
);

// Create the Task model using the task schema
const Task = model("Task", schema);

export default Task;
