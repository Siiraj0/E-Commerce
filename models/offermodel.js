const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true
    },
    percentage : {
        type : Number,
        required : true
    },

    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },

    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    },

    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('offer',offerSchema)