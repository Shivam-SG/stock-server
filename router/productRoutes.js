const express = require("express");
const {CreateProductController, UpdateProductController, getProductController, ProductPhotoController, DeleteProductController, SingleProductController,} = require("../controllers/productController.js");
const formidableMiddleware = require("express-formidable");

const router = express.Router();

router.route("/create-product").post(formidableMiddleware(), CreateProductController);
router.route("/update-product/:pid").put(formidableMiddleware(), UpdateProductController);
router.route("/get-product").get(formidableMiddleware(), getProductController);
router.route("/get-productphoto/:pid").get(formidableMiddleware(), ProductPhotoController);
router.route("/delete-product/:pid").delete(formidableMiddleware(), DeleteProductController);
router.route("/get-oneproduct/:pid").get(formidableMiddleware(), SingleProductController);

module.exports = router;
