import slugify from "slugify";
import { Category } from "../models/category.models.js";

const createCategoryController= async (req,res)=>{
 try {
     const {name}=req.body;
     if(!name){
       return res.status(401).send({message:"Name is require"})
     }
     const existingCategory = await Category.findOne({name});
     if(existingCategory){
        return res.status(200).send({
           success:true,
           message:"Category Already Exists"
        })
     }
     const category = await new Category({name,slug:slugify(name)}).save()
     res.status(201).send({
        success:true,
        message:"new category is created",
        category
     })
 } catch (error) {
     console.log(error)
     res.status(500).send({
        success:false,
        error,
        message:"Error in Category"
     })
 }
}

const updateCategoryController=async (req,res)=>{
try {
    const {name}=req.body;
    const {id}=req.params;

    const category=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    res.status(200).send({
        success:true,
        message:"Category Updated Successfully",
        category,
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error while Updating category",
        error,
    })
    
}
}


const categoryController=async(req,res)=>{
try {
    const category=await Category.find({});
    res.status(200).send({
        success:true,
        message:"All Categories List",
        category,
    })
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error while getting All Category",
        error
    })
    
}
}

const singleCategoryController=async(req,res)=>{
    try {
       
        const category=await Category.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get Single Category Successfully",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting Single Category"
        })
    }
}

const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
    const category=  await Category.findByIdAndDelete(id) 
      res.status(200).send({
        success:true,
        message:"Category Deleted Successfully",
        category
      }) 

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while deleting Category",
            error,
        })
    }
}
export {
    createCategoryController,
    updateCategoryController,
    categoryController,
    singleCategoryController,
    deleteCategoryController,
}