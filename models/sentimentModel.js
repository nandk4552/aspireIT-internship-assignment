const mongoose = require("mongoose");

//user schema object
const sentimentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "text is required"],
    },
    sentiment: {
      type: String,
      required: [true, "sentiment is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Sentiment", sentimentSchema);
