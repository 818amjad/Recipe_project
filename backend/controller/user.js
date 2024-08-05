const User=require("../models/user")
const  bycrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userSignUp=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({message:"email and password is required"})
    }
    let isUserExist=await User.findOne({email})
    if(isUserExist){
        return res.status(404).json({error:"Email is already exist"})
    }
   const hashPwd=await bycrypt.hash(password,10)
   const user=await User.create({
    email,password:hashPwd
   })
   let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY)
   return res.status(200).json({token,user})
}

const userLogin=async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    if(!email || !password){
        return res.status(400).json({message:"email and password is required"})
    }
    let user=await User.findOne({email})
    if(user && await bycrypt.compare(password,user.password)){
        let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY)
        return res.status(200).json({token,user})
    }
    else{
        res.status(400).json({error:"Invalid credientials"})
    }
}

const getUser=async(req,res)=>{
    const user=await User.findById(req.params.id)
    console.log(user)
    res.json({email:user.email})
}

module.exports={userSignUp,userLogin,getUser}