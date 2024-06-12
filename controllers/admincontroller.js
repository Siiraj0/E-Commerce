const bcrypt = require("bcrypt");
const userModel = require("../models/usermodel");
const adminModel = require("../models/adminmodel");
const usermodel = require("../models/usermodel");
const adminmodel = require("../models/adminmodel");
const categorymodel = require("../models/categorymodel");
const { ObjectId } = require("mongodb");
const productModel = require('../models/productmodel');
const { name } = require("ejs");

const adminLogin = (req, res) => {
  try {
    res.render("admin/login");
  } catch (error) {
    console.log(error.messege);
  }
};

const indexPage = (req, res) => {
  try {
    res.render("admin/index");
  } catch (error) {
    console.log(error.messege);
  }
};
const userPage = async (req, res) => {
  try {
    const userList = await userModel.find({});
    res.render("admin/user", { userList });
  } catch (error) {
    console.log(error.messege);
  }
};

const productPage = async (req, res) => {
  try {
    const productList = await productModel.find({}).populate('category')
    res.render("admin/product",{ productList });
  } catch (error) {
    console.log(error.messege);
  }
};


const categoryPage = async (req, res) => {
  try {
    const findcategorys = await categorymodel.find({});
    res.render("admin/category", { findcategorys });
  } catch (error) {
    console.log(error.messege);
  }
};

const getInAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const data = await adminModel.findOne({ email: req.body.email });
    console.log("data", data);
    if (data && data.password === req.body.password) {
      req.session.admin=data._id 
      res.redirect("/admin/index");
    } else {
      console.log("Incorrect email or password");
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const blockUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const userData = await usermodel.findOne({ _id: userId });

    if (userData) {
      let updatedUserData;
      if (userData.isBlocked === false) {
        updatedUserData = await usermodel.findByIdAndUpdate(
          userId,
          { $set: { isBlocked: true } },
          { new: true }
        );
      } else {
        updatedUserData = await usermodel.findByIdAndUpdate(
          userId,
          { $set: { isBlocked: false } },
          { new: true }
        );
      }

      console.log("Updated user data:", updatedUserData);
      res.status(200).json({
        success: true,
        message: "User blocked/unblocked successfully",
        user: updatedUserData,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
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

const addcategorypage = (req, res) => {
  try {
    const msg = req.flash('msg')
    res.render("admin/addcategory",{msg});
  } catch (error) {
    console.log(error.messege);
  }
};

const newcategory =async (req, res) => {
  try {
    if(req.body.name.trim()==''||req.body.description.trim()==''){
     req.flash('msg','fill the all fields')
     res.redirect('/admin/addcategory') 
     return
    }
    const pattern = new RegExp(`^${req.body.name}$`, 'i');
    
      const existCategory= await productModel.findOne({name: pattern})
      if(existCategory){
        req.flash('msg','category already exist')
        res.redirect('/admin/addcategory')
        return 
      }
      
    
    const category = new categorymodel({
      name: req.body.name,
      description: req.body.description,
    });
    category.save();
    res.redirect("/admin/category");
  } catch (error) {
    console.log(error.message);
  }
};

const editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const { name, description } = req.body;

    const category = await categorymodel.findByIdAndUpdate(
      { _id: categoryId },
      {
        name: name,
        description: description,
      }
    );
    // Send appropriate response
    res.redirect("/admin/category");
  } catch (error) {
    console.log(error.message);
    // Send error response
  }
};


const blockCategory= async (req,res)=>{
  try {
    const categoryId=req.body.categoryId;
    const categoryData=await categorymodel.findOne({_id : categoryId})


    if(categoryData){
      categoryData.isBlocked = !categoryData.isBlocked
      categoryData.save()
      res.send({success:true})
    }
  } catch (error) {
    console.log(error.message);
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



module.exports = {
  adminLogin,
  indexPage,
  userPage,
  categoryPage,
  productPage,
  getInAdmin,
  blockUser,
  addProductpage,
  addcategorypage,
  newcategory,
  editCategory,
  blockCategory,
  newProduct,
  editProductpage,
  editandupdateProduct,
  blockProduct
  


};
