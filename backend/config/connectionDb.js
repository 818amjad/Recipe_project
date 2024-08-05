const mongoose=require("mongoose")

const connectDb=async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then((err)=>console.log("connected..."))
    .catch((err)=>process.exit())
}

module.exports=connectDb