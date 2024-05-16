// Express route handlers for file upload and download
const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const File = require("../models/fileModel");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  uploadFileController,
  downloadFileController,
} = require("../controllers/fileController");

const router = express.Router();

// Multer storage configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//* UPLOAD FILE || POST || api/v1/file/upload
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadFileController
);

//* DOWNLOAD FILE || POST || api/v1/file/download/:fileId
router.get("/download/:fileId", authMiddleware, downloadFileController);

module.exports = router;
