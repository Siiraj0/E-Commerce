const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }, 
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    },
    isVerified:{
        type:Boolean,   
        required:true,
        default:false
    },
    googleId:{
        type:String
    }


})

module.exports = mongoose.model('user',userSchema)