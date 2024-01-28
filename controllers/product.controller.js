import fs from "fs";
import { Product } from "../models/product.models.js";
import slugify from "slugify";

const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });

      case !description:
        return res.status(500).send({ error: "description is Required " });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });
      case !photo: 
      return res.status(500).send({
        error: "Photo is Required" 
      })
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less than 1 mb" });
    }
    const products = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Products Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product ",
    });
  }
};

// get all products

const getProductController = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products ",
      error: error.message,
    });
  }
};

// single product
const getSingleProductController = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single Product",
      error: error.message,
    });
  }
};

// get photo
const productPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting the photo",
      error: error.message,
    });
  }
};

// delete product
const deleteProductController = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.pid).select(
      "-photo"
    );
    res.status(200).send({
      success: true,
      message: "Product Delete Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error: error.message,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });

      case !description:
        return res.status(500).send({ error: "description is Required " });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less than 1 mb" });
    }
    const products = await Product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Products update Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product ",
    });
  }
};



const productFiltersController=async(req,res)=>{
  try {
    const {checked,radio} =req.body
    let args={}
    if(checked.length>0) args.category=checked
    if(radio.length) args.price ={$gte:radio[0],$lte:radio[1]}
    const products=await Product.find(args);
    res.status(200).send({
      success:true,
      products,
    }) 

    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error while  filtring products"
    })
    
  }
}
export {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController
};
