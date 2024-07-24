const express = require("express");

const productController=require('../controllers/admin/product')
const categoryController=require('../controllers/admin/category')
const adminController=require('../controllers/admin/adminvalidation')
const userscontoller=require('../controllers/admin/users')
const ordersController=require('../controllers/admin/orders')
const indexController=require('../controllers/admin/indexpage')
const couponController = require('../controllers/admin/coupen')
const offerController=require('../controllers/admin/offer')

const adminRoute = express();
adminRoute.use(express.json());
adminRoute.use(express.urlencoded({ extended: true }));
const auth = require("../middlewares/admin");

adminRoute.get("/login", auth.logout, adminController.adminLogin);
adminRoute.get("/index", auth.login, indexController.indexPage);
adminRoute.get("/user", userscontoller.userPage);
adminRoute.get("/category", categoryController.categoryPage);
adminRoute.get("/product", productController.productPage);
adminRoute.get("/addproduct", productController.addProductpage);
adminRoute.get("/editproduct/:id", productController.editProductpage);
adminRoute.post("/editproduct/:id", productController.editandupdateProduct);
adminRoute.post("/addproduct", productController.newProduct);
adminRoute.get("/addcategory", categoryController.addcategorypage);
adminRoute.post("/addcategory", categoryController.newcategory);
adminRoute.post("/login", adminController.getInAdmin);
adminRoute.post("/blockuser", userscontoller.blockUser);
adminRoute.post("/editcategory/:id", categoryController.editCategory);
adminRoute.post("/blockcategory", categoryController.blockCategory);
adminRoute.post("/blockproduct", productController.blockProduct);
adminRoute.get("/orders", ordersController.loadorders);
adminRoute.get('/coupons', couponController.loadCoupons);
adminRoute.get('/offers', offerController.loadOffers);
adminRoute.get('/orderdetails/:id',ordersController.orderDetails);
adminRoute.post('/addCoupons',couponController.addCoupons)




module.exports = adminRoute;
