const express = require("express");
const orderController = require("../controllers/orders");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/getAllOrders", orderController.getAllOrders);

module.exports = router;
