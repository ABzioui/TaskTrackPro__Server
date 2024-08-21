import User from "../models/User.js";
import WorkHour from "../models/WorkHour.js";
import OverAll from "../models/OverAll.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "December";
    const currentYear = 2022;
    const currentDay = "2022-12-15";

    const userWorkHours = await WorkHour.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "userID",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          userID: 1,
          email: "$userDetails.email",
          firstName: "$userDetails.firstName",
          lastName: "$userDetails.lastName",
          date: 1,
          hours: 1,
        },
      },
    ]);

    /* Overall Stats */
    const overallStat = await OverAll.find({ year: currentYear });

    const {
      totalWorkers,
      yearlyTotalFinishedTasks,
      yearlyWorkedHours,
      monthlyData,
      FinishedProjectsByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalWorkers,
      yearlyTotalFinishedTasks,
      yearlyWorkedHours,
      monthlyData,
      FinishedProjectsByCategory,
      thisMonthStats,
      todayStats,
      userWorkHours,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
