import User from "../models/User.js";
import WorkHour from "../models/WorkHour.js";
import getCountryIso3 from "country-iso-2-to-3";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { location }) => {
      const countryISO3 = getCountryIso3(location);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([location, count]) => {
        return { id: location, value: count };
      }
    );
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserWorkHours = async (req, res) => {
  try {
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

    res.status(200).json(userWorkHours);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
