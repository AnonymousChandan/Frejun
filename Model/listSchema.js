const mongoose=require("mongoose")
const listModal=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})
const listSchema=mongoose.model("blog",listModal)
module.exports=listSchema