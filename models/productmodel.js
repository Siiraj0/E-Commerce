const mongoose=require('mongoose')


const productSchema= new mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true,
    },


    price:{
        type:Number,
        required:true
    },

    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:true
    },

    image:{
        type:Array,
        required:true
    },

    stock:{
        type:Number,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    offer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'offer'
    },

    offerPrice : {
        type : Number
    },
    percentage : {
        type:Number
    }



})


module.exports = mongoose.model('product',productSchema)