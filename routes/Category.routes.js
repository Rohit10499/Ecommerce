import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import { createCategoryController ,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController} from "../controllers/category.controller.js";
const router =express.Router()

//routes 
//create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

// update category

router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)

// get all category
router.get("/get-category",categoryController)

//get single Category Controller
router.get("/single-category/:slug",singleCategoryController);

//delete Category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)
export default router 