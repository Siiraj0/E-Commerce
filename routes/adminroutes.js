const express = require("express");

// Importing controllers
const productController = require('../controllers/admin/product');
const categoryController = require('../controllers/admin/category');
const adminController = require('../controllers/admin/adminvalidation');
const usersController = require('../controllers/admin/users');
const ordersController = require('../controllers/admin/orders');
const indexController = require('../controllers/admin/indexpage');
const couponController = require('../controllers/admin/coupen');
const offerController = require('../controllers/admin/offer');

const adminRoute = express();
adminRoute.use(express.json());
adminRoute.use(express.urlencoded({ extended: true }));

// Importing middleware
const auth = require("../middlewares/admin");

// Admin authentication routes
adminRoute.get("/login", auth.logout, adminController.adminLogin);
adminRoute.post("/login", adminController.getInAdmin);

// Index route
adminRoute.get("/index", auth.login, indexController.indexPage);

// User management routes
adminRoute.get("/user", auth.login, usersController.userPage);
adminRoute.post("/blockuser", usersController.blockUser);
adminRoute.get('/searchUser', auth.login, usersController.searchUser);

// Category management routes
adminRoute.get("/category", auth.login, categoryController.categoryPage);
adminRoute.get("/addcategory", auth.login, categoryController.addcategorypage);
adminRoute.post("/addcategory", auth.login, categoryController.newcategory);
adminRoute.post("/editcategory/:id", auth.login, categoryController.editCategory);
adminRoute.post("/blockcategory", categoryController.blockCategory);
adminRoute.get('/searchCategory', auth.login, categoryController.searchCategory);

// Product management routes
adminRoute.get("/product", auth.login, productController.productPage);
adminRoute.get("/addproduct", auth.login, productController.addProductpage);
adminRoute.post("/addproduct", auth.login, productController.newProduct);
adminRoute.get("/editproduct/:id", auth.login, productController.editProductpage);
adminRoute.post("/editproduct/:id", auth.login, productController.editandupdateProduct);
adminRoute.post("/blockproduct", productController.blockProduct);
adminRoute.get('/searchProduct', auth.login, productController.searchProduct);

// Order management routes
adminRoute.get("/orders", auth.login, ordersController.loadorders);
adminRoute.get('/orderdetails/:id', auth.login, ordersController.orderDetails);
adminRoute.post('/updateOrderStatus', auth.login, ordersController.updateOrderStatus);
adminRoute.get('/searchOrders', auth.login, ordersController.searchOrders);
adminRoute.get('/returnRequest', auth.login, ordersController.loadReturnRequets);
adminRoute.get('/downloadSalesReport', auth.login, ordersController.downloadSalesReport);

// Coupon management routes
adminRoute.get('/coupons', auth.login, couponController.loadCoupons);
adminRoute.post('/addCoupons', auth.login, couponController.addCoupons);
adminRoute.patch('/saveEditCoupons', auth.login, couponController.saveEditCoupon);
adminRoute.post('/editdata', auth.login, couponController.editdata);
adminRoute.get('/searchCoupons', auth.login, couponController.searchCoupons);

// Offer management routes
adminRoute.get('/offers', auth.login, offerController.loadOffers);
adminRoute.get('/addOffer', auth.login, offerController.loadAddOffer);
adminRoute.post('/addOffer', auth.login, offerController.addOffer);
adminRoute.get('/editOffer/:id', auth.login, offerController.loadEditOffer);
adminRoute.post('/editOffer', auth.login, offerController.editOffer);
adminRoute.patch('/offerDelete', auth.login, offerController.offerDelete);

// Sales report and statistics routes
adminRoute.get('/salesReport', auth.login, ordersController.salesReport);
adminRoute.get('/salesData', auth.login, indexController.salesData);
adminRoute.get('/sales', auth.login, indexController.salesChart);
adminRoute.get('/categoryChart', auth.login, indexController.categoryChart);


module.exports = adminRoute;
