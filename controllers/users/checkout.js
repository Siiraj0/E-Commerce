const cartModel=require('../../models/cartmodel')
const addressModel=require('../../models/addressmodel')
const orderModel= require('../../models/ordermodel')

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

const placeOrder=async(req,res) =>{
  try {
    const {addressSelected,orderAmount,paymentMethod} = req.body
    const userId = req.session.userId
    const address = await addressModel.findOne({ _id: addressSelected });
    const cart= await cartModel.findOne({userId:userId}).populate("products.productId")
    console.log(orderAmount,'carttttttttttttttttt');
    const neworder = await orderModel.create({
      userId : userId,
      products : cart.products.map((e)=>({
        productId : e.productId._id,
        qountity:e.count,
        totalPrice:e.count * e.productId.price
      })),
    deliveryAddress : address,
    orderAmount : orderAmount,

    payment : paymentMethod,
    
    })

    cart.products=[]
    await cart.save()

    res.redirect('/thankyou')


  } catch (error) { 
    console.log(error.message);
  }
}


const thankyou= (req,res)=>{
  try {
    res.render('user/thankyou')
  } catch (error) {
    console.log(error.message);
  }
}


  module.exports={
    checkout,
    checkoutAddAddress,
    placeOrder,
    thankyou,
  }