
const userModel = require("../../models/usermodel");



const productModel = require("../../models/productmodel");



const loadHome = async (req, res) => {
  try {
    const countProduct = await productModel.countDocuments({
      isBlocked: false,
    });

    res.render("user/index", { countProduct, user: req.session.userId });
  } catch (error) {
    console.log(error.message);
  }
};


module.exports={
    loadHome
}