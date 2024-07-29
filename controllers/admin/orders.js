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
  
const salesReport = async(req,res)=>{
  try {
    const orders = await orderModel.find({}).populate('products.productId')
    res.render('admin/salesReport',{orders})
  } catch (error) {
    console.log(error.message);
  }
}


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    const result = await orderModel.updateOne(
      { 'products._id': orderId },
      { $set: { 'products.$.orderStatus': newStatus } }
    );

    if (result.nModified > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Order status not updated. Order might not be found.' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  loadorders,
  orderDetails,
  salesReport,
  updateOrderStatus,
};