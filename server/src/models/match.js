const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
  participants: [
    {
      name: { type: String, required: true },
      country: { type: String, required: true },
    }
  ],
  timestamp: { type: String, required: true },
  scores: [
    {
      minutes: { type: String, required: true },
      score: [
        { type: String, required: true }
      ],
    },
  ],
  urlID: {type: String, required: true}
});

module.exports = mongoose.model("Match", matchSchema);
