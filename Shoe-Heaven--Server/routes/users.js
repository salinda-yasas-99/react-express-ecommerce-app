//import express from "express";
//import userController from "../controllers/users.js";
//import { addNewUser, getUsers, deleteUser } from "../controllers/users.js";
const express = require("express");
const userController = require("../controllers/users");

const router = express.Router();
const path = require("path");
//const userController = require("../controllers/users.js");

router.get("/getAllUsers", userController.getAllUsers);
router.post("/register/user", userController.addNewUser);
router.post("/register/admin", userController.addNewAdmin);
router.delete("/delete/:Id", userController.deleteUser);

module.exports = router;
//export default router;
