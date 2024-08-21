import Overall from "../models/OverAll.js";

export const getOverview = async (req, res) => {
  try {
    const overalls = await Overall.find();
    res.status(200).json(overalls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
