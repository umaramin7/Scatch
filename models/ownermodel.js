const mongoose=require("mongoose");

const ownerSchema=new mongoose.Schema({
    fullname:{
        type: String,
        minlength:3,
        trim :true
    },
    email:String,
    password:String,
    
    
    product:{
        type:Array,
        default:[]
    },
    gstin: String,
    picture:String
});
const userModel=mongoose.model("owner",ownerSchema);
module.exports=userModel;