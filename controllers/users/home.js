
const userModel = require("../../models/usermodel");
const cartModel = require('../../models/cartmodel')
const categoryModel = require('../../models/categorymodel')

const productModel = require("../../models/productmodel");



const loadHome = async (req, res) => {
  try {
  
    const cartcount = await cartModel.find().countDocuments()
    const countProduct = await productModel.countDocuments({
      isBlocked: false,
    });
    const womansCategory = await categoryModel.findOne({ name: "WOMANS" });

    const womansProducts = await productModel.find({category : womansCategory._id}).populate('category')

    console.log(womansProducts,'womansProducts');
    

    res.render("user/index", { countProduct,cartcount, user: req.session.userId ,womansProducts});
  } catch (error) {
    console.log(error.message);
  }
};


module.exports={
    loadHome
}