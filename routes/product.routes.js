import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import {
  createProductController,
  productFiltersController,
  updateProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  productCountCotroller,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController
} from "../controllers/product.controller.js";
import formidable from "express-formidable";

const router = express.Router();

// routes

// create product route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product route
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all products
router.get("/get-product", getProductController);

//get Single Product

router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter route
router.post("/product-filters", productFiltersController);

// products Count
router.get("/product-count", productCountCotroller);

//product per page

router.get("/product-list/:page", productListController);

//search product

router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid",relatedProductController)

//category wise product
router.get("/product-category/:slug", productCategoryController);
export default router;
