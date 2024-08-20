const categorymodel = require("../../models/categorymodel");
const productModel = require("../../models/productmodel");

const shopPage = async (req, res) => {
  try {
    const limit = 6; // Number of products per page
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const filter = req.query.filter;
    const searchTerm = req.query.term;
    let filterObj = {};
    let searchObj = { isBlocked: false, stock: { $gt: 0 } }; // Filter out out-of-stock products

    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      searchObj.name = { $regex: regex };
    }

    let products;

    if (filter === "popularity") {
      products = await productModel.aggregate([
        { $match: searchObj },  // Apply search filter
        {
          $lookup: {
            from: 'orders',  // Assuming your orders collection is named 'orders'
            localField: '_id',  // Match product ID in orders
            foreignField: 'products.productId',  // Assuming orders have a products array with productId
            as: 'orders'  // The result will be stored in a field named 'orders'
          }
        },
        {
          $addFields: {
            popularity: { $size: "$orders" }  // Count how many times each product appears in orders
          }
        },
        { $sort: { popularity: -1 } },  // Sort by popularity in descending order
        { $skip: skip },
        { $limit: limit }
      ]);
    } else {
      switch (filter) {
        case "lowToHigh":
          filterObj.offerPrice = 1;
          break;
        case "highToLow":
          filterObj.offerPrice = -1;
          break;
        case "latest":
          filterObj._id = -1;
          break;
        default:
          break;
      }

      products = await productModel.find(searchObj)
        .populate({
          path: 'category',
          match: { isBlocked: false }
        })
        .populate('offer')
        .sort(filterObj)
        .skip(skip)
        .limit(limit);
    }

    // Calculate total products count for pagination
    const totalProductsCount = await productModel.countDocuments(searchObj);
    const totalPages = Math.ceil(totalProductsCount / limit);

    res.render("user/shop", {
      filteredProductData: products,
      totalProductsCount,
      user: req.session.userId,
      totalPages,
      currentPage: page,
      filter,
      category: await categorymodel.find(),
      searchTerm
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
};



const productpage = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await productModel.findOne({ _id: id }).populate('offer');

    res.render("user/product", { productData, user: req.session.userId });
  } catch (error) {
    console.log(error.message);
  }
};

const searchProduct = async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search

    const products = await productModel.find({
      name: { $regex: regex }
    })
      .populate('category')
      .populate({
        path: 'offer',
        match: { endDate: { $gte: new Date() }, startDate: { $lte: new Date() } }
      });

    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};


const shopFiltering = async (req,res)=>{
  try {
    const category=req.query.category;
 
    if(category){
      

      const limit = 6; // Number of products per page
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;
      const filter = req.query.filter;
      const searchTerm = req.query.term;
      let filterObj = {};
      let searchObj = { isBlocked: false, stock: { $gt: 0 } }; // Filter out out-of-stock products
  
      const products=await productModel.find({category:category}).populate("category").sort(filterObj)
      .skip(skip)
      .limit(limit);

      if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i');
        searchObj.name = { $regex: regex };
      }
  
      switch (filter) {
        case "lowToHigh":
          filterObj.offerPrice = 1;
          break;
        case "highToLow":
          filterObj.offerPrice = -1;
          break;
        case "latest":
          filterObj._id = -1;
          break;
        default:
          break;
      }
  
      // Fetch products and apply filter
      const categories = await categorymodel.find()
  
      // Calculate total products count for pagination
      const totalProductsCount = await productModel.countDocuments(searchObj);
      const totalPages = Math.ceil(totalProductsCount / limit);
  
      // res.render()
      res.render("user/shop", {
        filteredProductData: products,
        totalProductsCount,
        user: req.session.userId,
        totalPages,
        currentPage:page,
        filter,
        category:categories,
        searchTerm
      });
    }
    
  } catch (error) {
    console.log("error : ",error);
  }
}

module.exports = {
  shopPage,
  productpage,
  searchProduct,
  shopFiltering
};
