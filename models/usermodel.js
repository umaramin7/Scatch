const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    fullname:{
        type: String,
        minlength: 3,
        trim :true
    },
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
    }],
    order:{
        type:Array,
        default:[]
    },
    contact: Number,
    picture:String
});
const userModel=mongoose.model("users",userSchema);
module.exports=userModel;