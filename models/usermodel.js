const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    fullname:{
        type: String,
        minlength: 3,
        trim :true
    },
    email: string,
    password: string,
    cart:{
        type:Array,
        default:[]
    },
    isadmin: Boolean,
    order:{
        type:Array,
        default:[]
    },
    contact: Number,
    picture: string
});
const userModel=mongoose.model("users",userSchema);
module.exports=userModel;