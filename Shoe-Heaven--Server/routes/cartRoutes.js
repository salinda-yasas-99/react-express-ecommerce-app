const express = require("express");
const cartController = require("../controllers/cart");
const authController = require("../controllers/auth");

const router = express.Router();
const path = require("path");

router.post(
  "/addToCart/:uid",
  authController.accessAuthorizeUser,
  cartController.AddToCart
);
router.get(
  "/cartbyId/:uid",
  authController.accessAuthorizeUser,
  cartController.GetCartByUserId
);
router.get(
  "/allcarts/:uid",
  authController.accessAuthorizeUser,
  cartController.GetAllCartsIncludingCartItems
);

module.exports = router;
