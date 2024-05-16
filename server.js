const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
//env configuration
dotenv.config();

// connection to database
connectDB();

// rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to Sentiment Analysis Backend Server",
  });
});

//authentication routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
// user routes
app.use("/api/v1/user", require("./routes/userRoutes"));
//sentiment analysis routes
app.use("/api/v1/sentiment", require("./routes/sentimentRoutes.js"));
//secure file upload routes
app.use("/api/v1/file", require("./routes/fileRoutes.js"));

//PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.white.bgMagenta);
});
