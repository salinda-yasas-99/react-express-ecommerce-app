//import express from "express";
//import userController from "../controllers/users.js";
//import { addNewUser, getUsers, deleteUser } from "../controllers/users.js";
const express = require("express");
const userController = require("../controllers/users.js");

const router = express.Router();
const path = require("path");
//const userController = require("../controllers/users.js");

router.post("/register", userController.addNewUser);
// router.get("/", userController.getUsers);
// router.delete("/:id", userController.deleteUser);

module.exports = router;
//export default router;
