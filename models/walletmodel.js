const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema({

    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true

    },

    balance : {
        type :Number,
        required:true,
        default:0
    },

    transaction :[{
        amount : {type : Number},

        time : {
            type:Date,
            default:Date.now()
        },

        creditOrDebit : {
            type : String,
            enum :['credit','debit']
        }
        
    }]
})

module.exports=mongoose.model('wallet',walletSchema)