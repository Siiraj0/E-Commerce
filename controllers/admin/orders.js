const orderModel= require('../../models/ordermodel')
const cartModel = require('../../models/cartmodel')



const loadorders = async(req, res) => {
  try{
      
      const orders =await orderModel.find({}).populate("userId")

      res.render('admin/orders',{orders})
  }catch(error){
      console.log(error.message);
  }
}

const orderDetails=async (req,res)=>{
try {
  const orderId = req.params.id
  const orders =await orderModel.findOne({_id:orderId}).populate("products.productId")
    
 res.render('admin/orderdetails',{orders})
} catch (error) {
  console.log(error.message);
}
}
  
  module.exports={
    loadorders,
    orderDetails,
  }