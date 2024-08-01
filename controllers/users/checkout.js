const cartModel=require('../../models/cartmodel')
const addressModel=require('../../models/addressmodel')
const orderModel= require('../../models/ordermodel')
const couponModel= require('../../models/coupon');
const usermodel = require('../../models/usermodel');

const checkout =async (req, res) => {
    try {
 
     
      const userId=req.session.userId
      const addresses=await addressModel.find({userId:userId}).limit(3)
      // console.log(addresses,'addresses');
      const cartdata=await cartModel.find({userId:userId}).populate('products.productId')


       if(cartdata?.[0]?.products?.length > 0){
         
         res.render("user/checkout", { user: userId , cartdata,addresses});
       }else{
        res.redirect('/shop')
       }
    } catch (error) {
      console.log(error.message);
    }
  };


  const checkoutAddAddress = async(req,res) => {
    try{

    console.log('jhihihihihihihihhihhi');
        const {name, mobile, pincode, state, streetAddress, locality, city} = req.body
        const { userId } = req.session

        console.log(name, mobile, pincode, state, streetAddress, locality, city);

        // create a new address object
        const newAddress = new addressModel({
            userId: userId,
            name: name,
            mobile: mobile,
            pincode: pincode,
            state: state,
            streetAddress: streetAddress,
            locality: locality,
            city: city,
        })

        const inserted = await newAddress.save()

        if(inserted){
            res.json({success:true})
        }

    }catch(error){
        console.log(error.message);
    }
}
const placeOrder = async (req, res) => {
  try {
      const { addressSelected, couponDiscount, orderAmount, paymentMethod } = req.body;
      const userId = req.session.userId;
      const address = await addressModel.findOne({ _id: addressSelected });
      const cart = await cartModel.findOne({ userId: userId }).populate("products.productId");

      const newOrder = await orderModel.create({
          userId: userId,
          couponDiscount: parseFloat(couponDiscount), // Ensure it's a number
          products: cart.products.map(e => ({
              productId: e.productId._id,
              quantity: e.count,
              totalPrice: e.productId.offer ? Math.floor(e.productId.offerPrice) : Math.floor(e.productId.price) * e.count
          })),
          deliveryAddress: address,
          orderAmount: parseFloat(orderAmount), // Ensure it's a number
          payment: paymentMethod,
      });

      cart.products = [];
      await cart.save();

      res.redirect('/thankyou');
  } catch (error) {
      console.log(error.message);
  }
};





const thankyou= (req,res)=>{
  try {
    res.render('user/thankyou')
  } catch (error) {
    console.log(error.message);
  }
}


const loadEditAddress = async(req,res)=> {
  try{
      const { addressId } = req.body
      const findAddress = await addressModel.findOne({_id:addressId})

      res.json({findAddress})
      
  }catch(error){
      console.log(error.message);
  }
}

const saveEditAddress = async(req,res) => {
  try{
      const { addressId } = req.body
      const {name, mobile, pincode, state, streetAddress, locality, city} = req.body
      const addressUpdated = await addressModel.findOneAndUpdate({_id : addressId},{ $set : {name : name, mobile: mobile, pincode: pincode, state:state, streetAddress: streetAddress, locality: locality, city: city}},{new:true})
      if(addressUpdated){
          console.log('Address Updated');
          res.json({success:true})
      }

  }catch(error){
      console.log(error.message);
      res.json({error : 'error while updating address'})
  }
}

const removeAddress = async(req,res) => {
  try{
      const { addressId } = req.body
      const removed = await addressModel.findByIdAndDelete({_id : addressId})

      if(removed){
          console.log('Address removed');
          res.json({success:true})
      }
      
  }catch(error){
      console.log(error.message);
  }
}

const couponFetch = async (req, res) => {
  try {
    let amount = req.body.money;
    const updatedAmount = parseInt(amount, 10); // Directly use the amount
    
    console.log(`Fetching coupons for amount: ${updatedAmount}`);
    const data = await couponModel.find({ minAmount: { $lte: updatedAmount } });
    console.log('Coupons fetched:', data);
    res.send(data);
  } catch (error) {
    console.log('Error fetching coupons:', error.message);
    res.status(500).send({ error: 'Error fetching coupons' });
  }
};



const couponSubmit = async (req, res) => {
  try {
    const couponCode = req.body.couponCode;
   

    const findCoupon = await couponModel.findOne({ couponCode });
    console.log(findCoupon, 'findCoupon');

    if (!findCoupon) {
      return res.json({ message: 'Coupon not found' });
    }

    let store = findCoupon.percentage;
    res.json(store);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};



  module.exports={
    checkout,
    checkoutAddAddress,
    placeOrder,
    thankyou,
    loadEditAddress,
    saveEditAddress,
    removeAddress,
    couponFetch,
    couponSubmit,
    
  }