//import express from "express";
//import cors from "cors";
//import cookieParser from "cookie-parser";
//import path from "path";
// import userRoutes from "./routes/users.js";
// import authRoutes from "";
// import productRoutes from "./routes/products.js";
//import multer from "multer";

const path = require("path");
const express = require("express");
//const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
//const productRoutes = require("./routes/products.js");
const userRoutes = require("./routes/users.js");
//const authRoutes = require("./routes/auth.js");
const app = express();
const PORT = 7000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
//app.use("/api/product", productRoutes);

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// uploading endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
