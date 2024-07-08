const express = require("express");
const InqController = require("../controllers/Inquiry");

const router = express.Router();
const path = require("path");

router.post(
  "/add",
  // authController.accessAuthorizeUser,
  InqController.addNewInquiry
);
router.get(
  "/get",
  // authController.accessAuthorizeUser,
  InqController.getAllInquiry
);

module.exports = router;
