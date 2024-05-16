const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const File = require("../models/fileModel");
//upload file controller
const uploadFileController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Validate file size and type
    const fileSize = req.file.size;
    // Validate file type by checking the file extension
    const allowedTypes = ["audio", "video", "pdf"];
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    if (fileSize > 20 * 1024 * 1024) {
      return res.status(400).json({ message: "File size exceeds limit" });
    }

    // Save file to MongoDB with user ID
    const newFile = new File({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      size: fileSize,
      data: req.file.buffer,
      user: req.user.id, // Associate the user ID with the file
    });
    await newFile.save();

    res.status(201).send({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in file upload API",
    });
  }
};
//download file controller
const downloadFileController = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const userId = req.user.id;
    //validation
    if (!fileId || !userId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Find the file by ID and user ID
    const file = await File.findOne({ _id: fileId, user: userId });
    //validation
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Set response headers for file download
    res.set("Content-Type", file.contentType);
    res.set("Content-Disposition", `attachment; filename="${file.filename}"`);
    res.send(file.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in download file API",
    });
  }
};
module.exports = { uploadFileController, downloadFileController };
