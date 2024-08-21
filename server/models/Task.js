import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    taskID: {
      type: Number,
      default: 0,
    },
    taskName: String,
    description: String,
    startDate: Date,
    endDate: Date,
    projectID: Number,
    userID: Number,
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
