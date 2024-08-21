
const userModel = require("../../models/usermodel");
const usermodel = require("../../models/usermodel");
const categorymodel = require("../../models/categorymodel");
const productModel = require("../../models/productmodel");
const cartmodel = require("../../models/cartmodel");
const addressModel = require("../../models/addressmodel");
const orderModel = require("../../models/ordermodel")
const bcrypt = require('bcrypt');
const walletModel = require("../../models/walletmodel");
const instance = require('../../config/razorpay');
const offermodel = require("../../models/offermodel");
const ordermodel = require("../../models/ordermodel");
require('dotenv').config()

const myaccount = async (req, res) => {
    try {
      // loading cart quantity
  
      const userId = req.session.userId;
      const cartItems = await cartmodel
        .findOne({ userId: userId })
        .populate("products.productId");
        const walletData=await walletModel.findOne({ userId: userId})
       
        const cartcount = await cartmodel.countDocuments({userId:userId})
       
        
      const userData = await usermodel.findOne({ _id: req.session.userId });
      const addresses = await addressModel.find({ userId: userId });
      const orders = await orderModel.find({ userId: userId }).populate("products.productId").populate("userId").sort({_id : -1});
   
    
     
      if (userData) {
;
        res.render("user/myAccount", {
          userData,
          addresses,
          orders,
          walletData,
          cartItems,
         
          cartcount,
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
      const amount = req.body.amount * 100; // Amount in paise for Razorpay
      console.log(parseFloat(amount),'amount');
      
      const options = {
          amount,
          currency: "INR",
          receipt: 'receipt_order_74394'
      };
      console.log('Creating order with options:', options, user);
      
      instance.orders.create(options, (err, order) => {
          if (!err) {
              console.log('Order created successfully:', order);
              res.send({
                  success: true,
                  msg: 'ORDER created',
                  order_id: order.id,
                  amount,
                  key_id: process.env.RAZORPAY_IDKEY,
                  name: user.name,
                  email: user.email
              });
          } else {
              console.error("Error creating order:", err);
              res.status(500).send({ success: false, msg: "Failed to create order" });
          }
      });
  } catch (error) {
      console.log('Caught an error:', error.message);
      res.status(500).send({ success: false, msg: error.message });
  }
};



const editAddress = async (req, res) => {
  try {
    const id = req.body.id;
    const addressData = await addressModel.findOne({ _id: id });

    if (addressData) {
      res.json({
        name: addressData.name,
        mobile: addressData.mobile,
        pincode: addressData.pincode,
        state: addressData.state,
        streetAddress: addressData.streetAddress,
        locality: addressData.locality,
        city: addressData.city
      });
    } else {
      res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const saveEdit = async (req,res)=>{
  try {
    const {addressId,
      name,
      mobile,
      pincode,
      state,
      streetAddress,
      locality,
      city} = req.body;

      const saved = await addressModel.findByIdAndUpdate({_id:addressId},{
        $set:{
          name,
          mobile,
          pincode,
          state,
          streetAddress,
          locality,
          city
        }
      })
      res.json({success:true})
   
  } catch (error) {
    console.log(error.message);
  }
}
 


const orderDetails = async (req, res) => {
  try {
      const id = req.params.id;

      
      // Fetch the order with populated product details
      const order = await orderModel.findById(id)
      .populate('userId')
      .populate('products.productId');
      
      // Check if the order was found
      if (!order) {
        return res.status(404).render('error', { message: 'Order not found' });
      }
      const cartcount = await cartmodel.countDocuments({userId:req.session.userId})
      const deliveredProds = order.products.filter(product=> product.orderStatus === 'Delivered')
      // Calculate the tracking percentage based on the order status
      const getTrackingPercentage = (status) => {
          switch (status) {
              case 'Pending':
                  return 33; // 1/3
              case 'Shipped':
                  return 66; // 2/3
              case 'Delivered':
                  return 100; // Complete
              default:
                  return 0; // Default
          }
      };

      res.render('user/orderDetails', { 
          order,
          cartcount, 
          deliveredProds,
          getTrackingPercentage 
      });
  } catch (error) {
      console.error('Error fetching order details:', error.message);
      res.status(500).render('error', { message: 'Internal Server Error' });
  }
};


// Cancel Order
const cancelOrder = async (req, res) => {
  const { orderId, productId } = req.body;

  try {
      // Find the order by ID
      const order = await orderModel.findById(orderId);

      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }

      // Find the product in the order
      const product = order.products.find(p => p._id.toString() === productId);

      if (product) {
          // Update product status to cancelled
          product.cancelled = true;
          product.orderStatus = 'Cancelled';
          await order.save();
          return res.json({ message: 'Order cancelled successfully' });
      }

      return res.status(404).json({ message: 'Product not found in order' });
  } catch (error) {
      console.error('Error cancelling order:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Return Order
const returnOrder = async (req, res) => {
  const { orderId, productId } = req.body;

  try {
      // Find the order by ID
      const order = await orderModel.findById(orderId);

      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }

      // Find the product in the order
      const product = order.products.find(p => p._id.toString() === productId);

      if (product) {
          // Update product status to returned
          product.returned = true;
          product.orderStatus = "Return Requested";
          await order.save();
          return res.json({ message: 'Order returned successfully' });
      }

      return res.status(404).json({ message: 'Product not found in order' });
  } catch (error) {
      console.error('Error returning order:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

const returnApprove = async(req, res) => {
  try{
      const {productId,orderId,returnReason,userId} = req.body

      const returned = await orderModel.findOneAndUpdate({userId:userId,_id : orderId, 'products.productId' : productId},{
          $set : { 'products.$.orderStatus' : 'Returned', 'products.$.returned' : true, 'products.$.returnReason' : returnReason }
      },{new:true})

      if(returned){

          const returnedProduct =returned.products.find((prod)=>prod.productId.toString()==productId)

          if(returnedProduct){
              const eproduct = await productModel.findOne({_id:productId})
              let updatedStock = eproduct.quantity + returnedProduct.quantity;

              await productModel.findOneAndUpdate({_id:productId},{$set:{quantity:updatedStock}})
              console.log(returned.payment,'returnedProduct.payment');
              
             if(returned.payment !== "COD"){

               await walletModel.findOneAndUpdate({userId:userId},
                {$inc:{balance:parseFloat(returnedProduct.totalPrice.toFixed(2))},
                $push: {transaction :{amount:parseFloat(returnedProduct.totalPrice.toFixed(2)), creditOrDebit:'credit'}}},
                {new : true, upsert:true})
              }
            }
          
      }
      console.log('Returned');
      res.json({success:true})

  }catch(error){
      console.log(error.message);
  }
}


const loadInvoice =async (req,res)=>{
  try {
    const orderId = req.params.id
    const orderr = await orderModel.findById(orderId).populate('products.productId')
    const products = orderr.products
    console.log(products,'productss');
    console.log(orderr,'orderr');
    
    res.render('user/invoice',{orderr,products})
  } catch (error) {
    console.log(error.messege);
    
  }
}

const repayment = async (req, res) => {
  try {
    console.log('malalamalamamlaamlaml');
    
    const {  paymentId } = req.body;
    const orderId = req.params.id
    console.log(orderId,'ggggggggjkookok');
    
    const order = await ordermodel.findOneAndUpdate(
      { _id: orderId },
      { 
        paymentStatus: 'Paid',
        payment: 'Online Payment'
      },
      { new: true }
    );

    if (!order) {
      return res.json({ success: false, message: 'Order not found' });
    }

    res.redirect('/myAccount')
  } catch (error) {
    console.error('Error in repayment:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


  module.exports={
    myaccount,
    editUser,
    addAddress,
    logout,
    updateProfile,
    addWallet,
    razorPay,
    editAddress,
    saveEdit,
    orderDetails,
    cancelOrder,
    returnOrder,
    returnApprove,
    loadInvoice,
    repayment,


  }