const express = require("express");
const orderController = require("../controllers/orders");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/getAllOrders", orderController.getAllOrders);
router.get("/userOrders/:userId", orderController.getOrdersByUserId);
router.get("/monthlyOrders", orderController.getTotalOrdersByMonth);
router.put("/statusUpdate/:id", orderController.updateOrderStatus);

router.get("/currentOrders", orderController.getCurrentMonthOrders);

module.exports = router;
