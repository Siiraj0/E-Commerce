const cartModel=require('../../models/cartmodel')
const addressModel=require('../../models/addressmodel')
const orderModel= require('../../models/ordermodel')
const userModel = require('../../models/usermodel')
const instance = require('../../config/razorpay')

const razor = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.session.userId })
        const amount = req.body.amount * 100
        const options = {
            amount: amount,
            currency: "INR",
            receipt: 'sirajkp752@gmail.com'
        }
        instance.orders.create(options, (err, order) => {
            if (!err) {
                res.send({
                    succes: true,
                    msg: 'ORDER created',
                    order_id: order.id,
                    amount: amount,
                    key_id: process.env.RAZORPAY_IDKEY,
                    name: user.name,
                    email: user.email
                })
            } else {
                console.error("Error creating order:", err);
                res.status(500).send({ success: false, msg: "Failed to create order" });
            }
        })
    } catch (err) {
        console.log(err.message + '     razor')
    }
}

module.exports = {
    razor,

}