
const userModel = require("../../models/usermodel");
const usermodel = require("../../models/usermodel");
const categorymodel = require("../../models/categorymodel");
const productModel = require("../../models/productmodel");
const cartmodel = require("../../models/cartmodel");
const addressModel = require("../../models/addressmodel");
const orderModel = require("../../models/ordermodel")
const bcrypt = require('bcrypt');
const walletModel = require("../../models/walletmodel");
const instance = require('../../config/razorpay')
require('dotenv').config()

const myaccount = async (req, res) => {
    try {
      // loading cart quantity
  
      const userId = req.session.userId;
      const cartItems = await cartmodel
        .findOne({ userId: userId })
        .populate("products.productId");
        const walletData=await walletModel.findOne({ userId: userId})
      const userData = await usermodel.findOne({ _id: req.session.userId });
      console.log(userData+'user data for test')
      const addresses = await addressModel.find({ userId: userId });
      const orders = await orderModel.find({ userId: userId }).populate("products.productId").populate("userId");
     
      if (userData) {
;
        res.render("user/myAccount", {
          userData,
          addresses,
          orders,
          walletData,
          cartItems,
          user: req.session.userId,
        });
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addAddress = async (req, res) => {
    try {
      const { name, mobile, pincode, state, streetAddress, locality, city } =
        req.body;
      const userId = req.session.userId || req.body.userId;
  
      const newAddress = new addressModel({
        userId: userId,
        name: name,
        mobile: mobile,
        pincode: pincode,
        state: state,
        streetAddress: streetAddress,
        locality: locality,
        city: city,
      });
  
      await newAddress.save();
  
      res.redirect("/myAccount");
    } catch (error) {
      console.log(error.message);
    }
  };

  const editUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const { name, email, mobile } = req.body;
  
      const user = await usermodel.findByIdAndUpdate(
        { _id: userId },
        {
          name: name,
          email: email,
          mobile: mobile,
        }
      );
  
      res.redirect("/myAccount");
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadOrderDetails = async (req, res) => {
    try {
      const orderId = req.params.id;
      const orders = await ordermodel
        .findById(orderId)
        .populate("products.productId");
  
      const userId = req.session.user_id;
      const cartItems = await cartmodel
        .findOne({ userId: userId })
        .populate("products.productId");
  
      res.render("users/orderDetails", { orders, cartItems });
    } catch (error) {
      console.log(error.message);
    }
  };


  const logout = (req, res) => {
    try {
      req.session.userId = null;
      res.json({ status: true });
    } catch (error) {
      console.log(error.messege);
    }
  };

  const updateProfile = async (req, res) => {
    try {
      console.log(req.session.userId, 'lllllll');
      const userId = req.session.userId;
      const user = await usermodel.findById(userId);
      console.log(user, 'usersssssssssssssssss');
      
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Update user details
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobile = req.body.mobile || user.mobile;
  
      // Handle password change
      if (req.body.currentPwd && req.body.newPwd) {
        const isMatch = await bcrypt.compare(req.body.currentPwd, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Current password is incorrect' });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.newPwd, salt);
      }
  
      await user.save();
      res.json({ msg: 'Profile updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  
const addWallet = async (req,res)=>{
  try {
  
      const addMoney =req.body.walletAdd
      
      await walletModel.findOneAndUpdate({userId:req.session.userId},{$inc:{balance:addMoney},$push:{transaction:{amount:addMoney,creditOrDebit:'credit', date: new Date()}}},{upsert:true, new:true})
      res.redirect('/myAccount')
  } catch (error) {
      error.message(error.message)
  }
}


const razorPay = async (req, res) => {
  try {
      
      const user = await userModel.findOne({ _id: req.session.userId });
      const amount = req.body.amount * 100;
      const options = {
          amount,
          currency: "INR",
          receipt: 'sirajkp752@gmail.com'
      };
     console.log('Creating order with options:', options,user);
     
      instance.orders.create(options, (err, order) => {
          if (!err) {
              res.send({
                  success: true,
                  msg: 'ORDER created',
                  order_id: order.id,
                  amount,
                  key_id:  process.env.RAZORPAY_IDKEY,
                  name: user.name,
                  email: user.email
              });
              
          } else {
              console.log('shkjfdhsfhlasdfhas;dkfhsdfjhasfkjhskjfhksjdfhksdfkjsfjk')
              console.error("Error creating order:", err);
              res.status(500).send({ success: false, msg: "Failed to create order" });
          }
      });
  } catch (error) {
      console.log('Caught an error:', error.message);
      res.status(500).send({ success: false, msg: error.message });
  }
};




  module.exports={
    myaccount,
    editUser,
    addAddress,
    loadOrderDetails,
    logout,
    updateProfile,
    addWallet,
    razorPay,
  }