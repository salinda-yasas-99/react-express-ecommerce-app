const express = require("express");
const feedbackController = require("../controllers/fedback");
const authController = require("../controllers/auth");

const router = express.Router();
const path = require("path");

router.post(
  "/add",
  authController.accessAuthorizeUser,
  feedbackController.AddNewFeedBack
);
router.get(
  "/get/:Id",
  //authController.accessAuthorizeUser,
  feedbackController.getFeedbackByID
);

module.exports = router;
