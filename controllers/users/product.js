const categorymodel = require("../../models/categorymodel");
const productModel = require("../../models/productmodel");
const cartModel = require('../../models/cartmodel')

const shopPage = async (req, res) => {
  try {
    const limit = 6; 
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const filter = req.query.filter;
    const searchTerm = req.query.term;
    let filterObj = {};
    let searchObj = { isBlocked: false, stock: { $gt: 0 } }; 

    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      searchObj.name = { $regex: regex };
    }

    let products;

    if (filter === "popularity") {
      products = await productModel.aggregate([
        { $match: searchObj },  
        {
          $lookup: {
            from: 'orders',  
            localField: '_id',  
            foreignField: 'products.productId',  
            as: 'orders'  
          }
        },
        {
          $addFields: {
            popularity: { $size: "$orders" }  
          }
        },
        { $sort: { popularity: -1 } },  
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

    const cartcount = await cartModel.countDocuments({userId:req.session.userId})
    
    const totalProductsCount = await productModel.countDocuments(searchObj);
    const totalPages = Math.ceil(totalProductsCount / limit);

    res.render("user/shop", {
      filteredProductData: products,
      totalProductsCount,
      user: req.session.userId,
      totalPages,
      currentPage: page,
      filter,
      cartcount,
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
    const cartcount = await cartModel.countDocuments({userId:req.session.userId})
    res.render("user/product", { productData,cartcount, user: req.session.userId });
  } catch (error) {
    console.log(error.message);
  }
};

const searchProduct = async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const regex = new RegExp(searchTerm, 'i'); 

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
      

      const limit = 6; 
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;
      const filter = req.query.filter;
      const searchTerm = req.query.term;
      let filterObj = {};
      let searchObj = { isBlocked: false, stock: { $gt: 0 } }; 
  
      const products=await productModel.find({category:category}).populate("category offer").sort(filterObj)
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
  
      
      const categories = await categorymodel.find()
  
      
      const totalProductsCount = products.length
      
      const cartcount = await cartModel.countDocuments({userId:req.session.userId})
      const totalPages = Math.ceil(totalProductsCount / limit);
  
      
      res.render("user/shop", {
        filteredProductData: products,
        totalProductsCount,
        user: req.session.userId,
        totalPages,
        currentPage:page,
        filter,
        cartcount,
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
