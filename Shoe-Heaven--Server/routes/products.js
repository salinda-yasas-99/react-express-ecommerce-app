const express = require("express");
const productController = require("../controllers/products");
const authController = require("../controllers/auth");

const router = express.Router();
const path = require("path");

router.post("/addProduct", productController.AddNewProduct);
router.get(
  "/getAllProducts",
  authController.accessAuthorizeUser,
  productController.getAllProducts
);
router.get("/IsIdAvailable/:Id", productController.checkProductId);
router.delete("/delete/:Id", productController.deleteUser);
router.put("/update/:Id", productController.updateProductById);

module.exports = router;
