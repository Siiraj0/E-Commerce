const productModel = require('../../models/productmodel');
const categorymodel = require("../../models/categorymodel");
const offerModel = require('../../models/offermodel');

const productPage = async (req, res) => {
  try {
      const limit = 5;
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;
      const totalProsCount = await productModel.countDocuments();
      const totalPages = Math.ceil(totalProsCount / limit);

      const productList = await productModel.find({})
          .populate('category')
          .populate({
              path: 'offer',
              match: { endDate: { $gte: new Date() }, startDate: { $lte: new Date() } }
          })
          .skip(skip)
          .limit(limit)
          .sort({ _id: -1 });

      res.render("admin/product", { productList, totalPages, currentPage: page });
  } catch (error) {
      console.log(error.message);
  }
};


  const addProductpage =async (req, res) => {
    try {
      const msg= req.flash('msg')
      const productCategory = await categorymodel.find({})
      res.render("admin/addproduct", { productCategory,msg });
    } catch (error) {
      console.log(error.messege);
    }
  };
  
  const editProductpage =async (req,res)=>{
    try {
      const id  = req.params.id
      console.log(id,'id');
      const productCategory = await categorymodel.find()
      const specialProduct = await productModel.findById(id)
      console.log(specialProduct,'specialProduct');
     res.render('admin/editproduct' ,{ productCategory,specialProduct })
    } catch (error) {
      console.log(error.messege);
    }
  }
  
  const editandupdateProduct= async (req,res)=>{
    try {
     const id = req.params.id
     await productModel.findOneAndUpdate({_id:id},{$set:{name:req.body.name,price:req.body.price,stock:req.body.stock,description:req.body.description,category:req.body.category,image:req.body.image}})
      res.redirect('/admin/product')
    } catch (error) {
      console.log(error.messege);
    }
  }

  const blockProduct= async (req, res)=>{
    try {
      productId=req.body.productId;
      productData=await productModel.findOne({_id : productId})
  
      if(productData){
        productData.isBlocked = !productData.isBlocked
        productData.save()
        res.send({success:true})
      }
    } catch (error) {
      console.log(error.messege);
    }
  }
  
  const newProduct = async (req, res) => {
    try {
      console.log(req.body.image);
  
  
      if (req.body.name.trim() === '' || req.body.description.trim() === '' || req.body.stock.trim() === '' || req.body.price.trim() === '') {
        req.flash('msg', 'Fill all the fields');
        res.redirect('/admin/addproduct');
        return;
      }
  
    
      const pattern = new RegExp(`^${req.body.name}$`, 'i');
      const existProduct = await productModel.findOne({ name: pattern });
      if (existProduct) {
        req.flash('msg', 'Product already exists');
        res.redirect('/admin/addproduct');
        return;
      }
  
  
      if (req.body.price < 0 || req.body.stock < 0) {
        req.flash('msg', 'Negative values are not allowed');
        res.redirect('/admin/addproduct');
        return;
      }
                                                                                              
    
  
      // Create new product
      const product = await productModel.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
        stock: req.body.stock
      });
  
      
      res.redirect('/admin/product');
    } catch (error) {
      console.log(error.message);
     
      req.flash('msg', 'An error occurred');
      res.redirect('/admin/addproduct');
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

  module.exports={
    productPage,
    addProductpage,
    newProduct,
    editProductpage,
    editandupdateProduct,
    blockProduct,
    searchProduct
  }