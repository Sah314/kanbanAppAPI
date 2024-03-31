import { Schema, model } from "mongoose";
const priorityEnumValues = ["Low", "Medium", "High"];

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  duedate: { type: Date, required: true },
  labels: [String],
  priority: {String,
  enum:priorityEnumValues},
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user model
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true }, // Reference to board model
});

const Task = model("Task", taskSchema);

export default Task;
