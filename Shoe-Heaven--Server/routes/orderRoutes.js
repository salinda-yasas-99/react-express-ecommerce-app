const express = require("express");
const orderController = require("../controllers/orders");
const authController = require("../controllers/auth");

const router = express.Router();

router.get(
  "/getAllOrders",
  authController.accessAuthorizeOrder,
  orderController.getAllOrders
);
router.get(
  "/userOrders/:userId",
  authController.accessAuthorizeUser,
  orderController.getOrdersByUserId
);
router.get(
  "/monthlyOrders",
  authController.accessAuthorizeOrder,
  orderController.getTotalOrdersByMonth
);
router.put(
  "/statusUpdate/:id",
  authController.accessAuthorizeOrder,
  orderController.updateOrderStatus
);

router.get(
  "/currentOrders",
  authController.accessAuthorizeOrder,
  orderController.getCurrentMonthOrders
);

module.exports = router;
