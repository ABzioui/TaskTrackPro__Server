import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projectID: Number,
    projectName: String,
    description: String,
    startDate: Date,
    endDate: Date,
    finished: Boolean,
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
