 import express from "express";
 import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import categoryRoute from "./routes/Category.routes.js"
import productRoute from "./routes/product.routes.js"
import cors from "cors";

 // configure env
dotenv.config();

//databse config
connectDB(); 

//rest objectm
 const app=express();

 // middelwares
 app.use(cors())
 app.use(express.json())



 //routes
 app.use("/api/v1/auth",authRoutes);
 app.use("/api/v1/category",categoryRoute);
 app.use("/api/v1/product",productRoute);

 //port 
 const port=process.env.PORT || 2410;

 app.get("/",(req,res)=>(
    res.send({
        message:"welcome to ecommerce app"
    })
 ))
 
 
 app.listen(port,()=>(console.log(`server is running on port ${port}`)))  