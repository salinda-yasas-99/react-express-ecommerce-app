// import express from 'express'
// import { login, register } from '../controllers/auth.js';

const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();
const path = require("path");

router.post("/login/user", authController.loginUser);

module.exports = router;

// const router = express.Router()

// router.post("/register",register)
// router.post("/login",login)

// export default router;
