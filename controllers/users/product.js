const productModel = require("../../models/productmodel");

const shopPage = async (req, res) => {
  try {
    const limit = 6;
    const page = parseInt(req.query.page) || 1
    const skip =(page - 1)*limit;
    const totalProsCount = await productModel.countDocuments();
    const totalPages = Math.ceil(totalProsCount / limit)
    const filter=req.query.filter;
    let filterObj={}
    switch(filter){
      case "lowToHigh":
       
        filterObj.price=-1;
        break;
        case "highToLow":
          filterObj.price=1;
          break;
      default:
        break;
    }
    const productData = await productModel.find({ isBlocked: false }).populate('category').skip(skip).limit(limit).sort(filterObj);
    console.log(filterObj);
    const countProduct = await productModel.countDocuments({ isBlocked: false });
    res.render("user/shop", { productData, countProduct, user: req.session.userId ,totalPages, currentPage :page});
  } catch (error) {
    console.log(error.message);
  }
};

const productpage = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await productModel.findOne({ _id: id });
    const countProduct = await productModel.countDocuments({ isBlocked: false });

    res.render("user/product", { productData, countProduct, user: req.session.userId });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  shopPage,
  productpage
};
