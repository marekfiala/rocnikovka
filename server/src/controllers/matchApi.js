const Match = require("../models/match");

const handleError = (res, error) => {
  console.log(error);
  res.status(500).json({
    error: error,
  });
};

exports.getMatches = async (req, res) => {
  try {
    const result = await Match.find();
    if (!result) return res.status(404).json({ message: "Matches not found" });
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getMatch = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await Match.find({urlID: id});
    if (!result) return res.status(404).json({ message: "Matches not found" });
    res.status(200).json(...result);
  } catch (error) {
    handleError(res, error);
  }
};

