const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },

    products : [{
        productId : {
            type  : mongoose.Schema.Types.ObjectId,
            ref : 'product',
            required : true
        },

        quantity : {
            type : Number,
            required :true,
            default : 1,
        },

        totalPrice : {
            type : Number,
            required : true,
            default : 0
        },

        orderStatus : {
            type : String,
            enum : ['Pending', 'Shipped', 'Delivered', 'Cancelled','Returned'],
            required : true,
            default : 'Shipped'
        },

        cancelled : {type : Boolean, default : false},

        cancelReason : {type : String, default : ''},

        returned : {type : Boolean, default : false},

        returnReason : {type : String, }
    }],

    deliveryAddress : {
        name : { type : String, required : true },
        mobile : { type : Number, required : true },
        pincode : { type : Number, required : true },
        state : { type : String, required : true },
        streetAddress : { type : String, required : true },
        locality : { type : String, required : true },
        city : { type : String, required : true },
    },

    orderAmount : {
        type : Number,
        required : true
    },

    payment : {
        type : String,
        required : true
    },

    orderDate : {
        type : Date,
        required : true,
        default : Date.now
    },
    
})

module.exports = mongoose.model('order',orderSchema)