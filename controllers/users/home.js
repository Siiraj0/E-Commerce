
const userModel = require("../../models/usermodel");
const cartModel = require('../../models/cartmodel')
const categoryModel = require('../../models/categorymodel')

const productModel = require("../../models/productmodel");



const loadHome = async (req, res) => {
  try {
    const cartcount = await cartModel.countDocuments({userId:req.session.userId})
    const countProduct = await productModel.countDocuments({ isBlocked: false });

    const womansCategory = await categoryModel.findOne({ name: "WOMANS" });
    const womansProducts = await productModel.find({ category: womansCategory._id }).populate('category');

    // Fetch the latest products (e.g., limit to the 6 most recent)
    const latestProducts = await productModel.find({ isBlocked: false })
      .sort({ _id: -1 }) // Sorting by _id in descending order to get the latest products
      .limit(6)
      .populate('category'); 

    console.log(womansProducts, 'womansProducts');

    res.render("user/index", { countProduct, cartcount : cartcount, user: req.session.userId, womansProducts, latestProducts });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadHome
};
