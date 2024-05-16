const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();
const path = require("path");

router.post("/login/user", authController.loginUser);

module.exports = router;
