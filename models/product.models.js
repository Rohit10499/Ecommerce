import mongoose from "mongoose";
const productSchema=new mongoose.Schema({

 name:{
    type:String,
    require:true,

 },
 slug:{
    type:String,
    require:true
 },
 description:{
    type:String,
    require:true
 },
 price:{
    type:Number,
    require:true
},
category:{
    // type:Schema.Types.ObjectId,
    type:mongoose.ObjectId,
    ref:"Category",
    require:true
},
quantity:{
    type:Number,
    require:true,
},
photo:{
    data:Buffer,
    contentType:String
},
shipping:{
    type:Boolean,
}

},{timestamps:true})



export const Product=new mongoose.model("Product",productSchema);