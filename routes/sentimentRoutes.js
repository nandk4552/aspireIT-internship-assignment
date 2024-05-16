const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  analyzeController,
  getAllController,
} = require("../controllers/sentimentConroller");

const router = express.Router();

//routes
//* ANALYZE || POST || api/v1/sentiment/analyze
router.post("/analyze", authMiddleware, analyzeController);

//* GET ALL SENTIMENTS || GET || api/v1/sentiment/get-all
router.get("/get-all", authMiddleware, getAllController);

module.exports = router;
