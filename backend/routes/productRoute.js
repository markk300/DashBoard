const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require("../controllers/productController");

router.post("/", protect, createProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.patch("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);


module.exports = router;


