const express = require("express");
const InqController = require("../controllers/Inquiry");
const authController = require("../controllers/auth");

const router = express.Router();
const path = require("path");

router.post(
  "/add",
  //authController.accessAuthorizeUser,
  InqController.addNewInquiry
);
router.get(
  "/get",
  authController.accessAuthorizeOrder,
  InqController.getAllInquiry
);

module.exports = router;

router.delete(
  "/delete/:Id",
  authController.accessAuthorizeAdmin,
  InqController.deleteInquiry
);

module.exports = router;
