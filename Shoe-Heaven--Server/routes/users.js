const express = require("express");
const userController = require("../controllers/users");
const authController = require("../controllers/auth");

const router = express.Router();
const path = require("path");

router.get(
  "/getAllUsers",
  // authController.accessAuthorizeAdmin,
  userController.getAllUsers
);
router.post("/register/user", userController.addNewUser);
router.post("/register/admin", userController.addNewAdmin);
router.delete(
  "/delete/:Id",
  // authController.accessAuthorizeAdmin,
  userController.deleteUser
);
router.put("/update/:userId", userController.updateUserDetails);

router.get("/userdetails/:userId", userController.getUserById);
module.exports = router;
