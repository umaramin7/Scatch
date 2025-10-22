const mongoose=require("mongoose");

const ownerSchema=new mongoose.Schema({
    fullname:{
        type: String,
        minlength: 3,
        trim :true
    },
    email: string,
    password: string,
    
    
    product:{
        type:Array,
        default:[]
    },
    gstin: String,
    picture: string
});
const userModel=mongoose.model("owner",ownerSchema);
module.exports=userModel;