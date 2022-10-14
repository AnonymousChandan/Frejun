const express=require("express")
const dotenv=require("dotenv").config()
const mongoose=require("mongoose")
const blogcontroller=require("./Controllers/BlogController")
const server=express()
server.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log(`Server connected on ${process.env.PORT}`);
    }
})
server.use(express.json())
server.use(express.urlencoded({extended:false}))
mongoose.connect(process.env.DATABASE,(err)=>{
    if(!err){
        console.log(`Database connected`);
    }
})
server.use("/api",blogcontroller)

