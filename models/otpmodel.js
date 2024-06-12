const mongoose=require('mongoose')

   const ObjectId= mongoose.Schema.Types.ObjectId


const OTPSchema=new mongoose.Schema({

    
    otp:{
        type:Number,
        require:true
    },

    userId:{
        type:String,
        required:true
},
    isVerified:{   
        type:String,
        default:false
},
    createDate:{
        type:Date,
        default:Date.now,
        expires:60*1
}

})



module.exports=mongoose.model('OTP',OTPSchema)