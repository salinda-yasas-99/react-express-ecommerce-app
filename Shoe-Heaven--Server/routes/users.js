const express = require("express");
const userController = require("../controllers/users");
const authController = require("../controllers/auth");

const router = express.Router();
const path = require("path");

router.get(
  "/getAllUsers/:role",
  authController.accessAuthorizeOrder,
  userController.getAllUsers
);
router.post(
  "/register/user",

  userController.addNewUser
);
router.post(
  "/register/admin",
  authController.accessAuthorizeAdmin,
  userController.addNewAdmin
);
router.delete(
  "/delete/:Id",
  authController.accessAuthorizeAdmin,
  userController.deleteUser
);
router.put(
  "/update/:userId",
  authController.accessAuthorizeAdmin,
  userController.updateUserDetails
);

router.get(
  "/userdetails/:userId",
  authController.accessAuthorizeUser,
  userController.getUserById
);
module.exports = router;
