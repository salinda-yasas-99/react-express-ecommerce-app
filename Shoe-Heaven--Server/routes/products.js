const express = require("express");
const productController = require("../controllers/products");
const authController = require("../controllers/auth");

const router = express.Router();
const path = require("path");

router.post(
  "/addProduct",
  // authController.accessAuthorizeAdmin,
  productController.AddNewProduct
);
router.get("/getAllProducts", productController.getAllProducts);
router.get(
  "/IsIdAvailable/:Id",
  // authController.accessAuthorizeAdmin,
  productController.checkProductId
);
router.delete(
  "/delete/:Id",
  authController.accessAuthorizeAdmin,
  productController.deleteUser
);
router.put(
  "/update/:Id",
  authController.accessAuthorizeAdmin,
  productController.updateProductById
);

module.exports = router;
