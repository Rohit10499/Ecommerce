import { User } from "../models/user.models.js";
import { comparePassword, hashPassword } from "../utils/authHelper.js";
import JWT from "jsonwebtoken";

const registerController= async (req,res)=>{
    try {
        const {name,password,email,phone,address,answer}=req.body;
        //validations
        if(!name){
            return res.send({message:"Name is Required"})
        }
        if(!email){
            return res.send({message:"Email is Required"})
        }
        if(!password){
            return res.send({message:"Password is Required"})   
        }
        if(!phone){
            return res.send({message:"Phone is Required"})
        }
        if(!address){
            return res.send({message:"Address is Required"})
        }
        if(!answer){
            return res.send({message:"Answer is Required"})
        }
     // check user
        const exisitinguser= await  User.findOne({email})

        //exisiting user 
        if(exisitinguser){
           return res.status(200).send({
            success:false,
            message:"Already Register plaese login",
           })
        }

        //register user

        const hashedPassword =await hashPassword(password);

        // save 
        const user= await new User({name,email,phone,address,answer,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:"User Register Successfully",
            user
        })
        
    } catch (error) {
          console.log(error);
          res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
          })
    }
}


// Post method
   const loginController=async (req,res)=>{
    const{email,password} =req.body;

  

       try {
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalide email or Password",
                
            })
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email not register"
            })
        }

        const match=await comparePassword(password,user.password);
        if(!match){
            return res.status(404).send({
                success:false,
                message:" Invalid email or Password "
            })
        }
        
        //token 
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"});
          res.status(200).send({
            success:true,
            message:"login successfull", 
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },token
            ,
          })
       } catch (error) {
         console.log(error);
         res.status(500).send({
            success:false,
            message:"Error in login",
            error
         })
       }
   }

   //forgot password 
   const forgotPasswordController= async(req,res)=>{
    try {
        const {email,answer,newPassword}=req.body;
        if(!email){
            res.status(400).send({message:"Email is required"})
        }
        if(!answer){
            res.status(400).send({message:"Answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is required"})
        }

//check 
const user=await User.findOne({email,answer})
 //validation 
 if(!user){
   return res.status(404).send({
      success:false,
      message:"Wrong Email Or Answer"
    })
 }

   const hashed= await hashPassword(newPassword);
   await User.findByIdAndUpdate(user._id,{password:hashed});
   res.status(200).send({
    success:true,
    message:"Password Reset Successfully",
   })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Something went wrong',
            error
        })
        
    }

   }

   // test controller

   const testController=(req,res)=>{
    res.send("protected Route")
}   

const updateProfileController=async(req,res)=>{
    try {
        const {name,email,password,address,phone}=req.body
               const user=await User.findById(req.user._id);
        if(password  && password.length<6){
            return res.json({ error: "Passsword is required and 6 character long" });
        }  
       const hashedPassword=password? await hashPassword(password):undefined;
       const updatedUser= await User.findByIdAndUpdate(req.user._id,{
        name:name || user.name,
        password:hashedPassword || user.password,
        address:address || user.address,
        phone:phone || user.phone

       },{new:true});
       res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
       })

    
       
    
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message:"Error while updating profile",
            success:false,
            error
        })
        
    }
}

 

export {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
}