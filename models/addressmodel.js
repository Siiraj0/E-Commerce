const mongoose = require('mongoose')

const addressSchema= new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required:true
    },
    name : {
        type : String,
        required : true
    },

    mobile : {
        type : Number,
        required : true
    },

    pincode : {
        type : String,
        required : true
    },

    state : {
        type : String,
        required : true
    },

    streetAddress : {
        type : String,
        required : true
    },

    locality : {
        type : String,
        required : true
    },

    city : {
        type : String,
        required : true
    },

    default : {
        type :Boolean,
        default:false
    }

})

module.exports = mongoose.model('address',addressSchema)