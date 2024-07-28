const mongoose = require('mongoose')

const cartSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    products:[{
        productId:{
            type:mongoose.Schema.ObjectId,
            ref:'product',
            required:true
        },
        count:{
            type:Number,
            required: true,
            default: 1,
        }
    }],
    couponDiscount:{
        type:Number,
        default:0,
    }
})

module.exports = mongoose.model('cart',cartSchema)