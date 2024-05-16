const tf = require("@tensorflow/tfjs-node");
const use = require("@tensorflow-models/universal-sentence-encoder");
const sentimentModel = require("../models/sentimentModel");
const userModel = require("../models/userModel");

const analyzeSentiment = async (text) => {
  const model = await use.load();
  const embeddings = await model.embed([text]);

  const sentimentScore = computeSentimentScore(embeddings);
  return { sentiment: sentimentScore };
};

const computeSentimentScore = (embeddings) => {
  const score = embeddings.arraySync()[0].reduce((acc, val) => acc + val, 0);
  return score >= 0 ? "Positive" : "Negative";
};

//analyze controller
const analyzeController = async (req, res) => {
  // find user
  const user = await userModel.findById({ _id: req.body.id });

  //validation
  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User not found",
    });
  }

  const { text } = req.body;
  // validation
  if (!text) {
    return res.status(400).send({ error: "Text is required" });
  }

  try {
    const { sentiment } = await analyzeSentiment(text);
    console.log(sentiment);
    if (!sentiment) {
      return res.status(404).send({ error: "result not found" });
    }
    // save to db
    const data = new sentimentModel({
      text,
      sentiment,
      user: user._id,
    });
    await data.save();

    res.status(200).send({
      success: true,
      message: "Sentiment Analyze Successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const getAllController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const sentiments = await sentimentModel.find({ user: user._id });
    if (!sentiments) {
      return res.status(404).send({
        success: false,
        message: "Sentiments not found",
      });
    }
    //success response
    return res.status(200).send({
      success: true,
      message: "Get all sentiments successfully",
      data: sentiments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all sentiments API",
      error,
    });
  }
};

module.exports = { analyzeController, getAllController };
