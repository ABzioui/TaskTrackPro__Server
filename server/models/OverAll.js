import mongoose from "mongoose";

const OverallSchema = new mongoose.Schema(
  {
    totalWorkers: Number,
    yearlyWorkedHours: Number,
    yearlyTotalFinishedTasks: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalHours: Number,
        totalTasks: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalHours: Number,
        totalTasks: Number,
      },
    ],
    FinishedProjectsByCategory: {
      type: Map,
      of: Number,
    },
  },

  { timestamps: true }
);

const Overall = mongoose.model("Overall", OverallSchema);
export default Overall;
