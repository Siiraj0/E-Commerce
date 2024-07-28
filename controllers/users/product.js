const productModel = require("../../models/productmodel");

const shopPage = async (req, res) => {
  try {
    const limit = 6; // Number of products per page
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const filter = req.query.filter;
    let filterObj = {};

    switch (filter) {
      case "lowToHigh":
        filterObj.price = 1;
        break;
      case "highToLow":
        filterObj.price = -1;
        break;
      default:
        break;
    }

    // Fetch products and apply filter
    const products = await productModel.find({ isBlocked: false })
      .populate({
        path: 'category',
        match: { isBlocked: false }
      })
      .populate('offer')
      .sort(filterObj)
      .skip(skip)
      .limit(limit);

    // Calculate total products count for pagination
    const totalProductsCount = await productModel.countDocuments({ isBlocked: false });
    const totalPages = Math.ceil(totalProductsCount / limit);

    res.render("user/shop", {
      filteredProductData: products,
      totalProductsCount,
      user: req.session.userId,
      totalPages,
      currentPage: page,
      filter
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
};
;


const productpage = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await productModel.findOne({ _id: id }).populate('offer');

    res.render("user/product", { productData, user: req.session.userId });
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  shopPage,
  productpage
};

