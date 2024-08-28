const express = require("express");
const userRoute = express();
const session = require("express-session");
const auth = require("../middlewares/user");
const googleLogin = require("../passport");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");

// Session setup
userRoute.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);
userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));

// Importing controllers
const paymentController = require('../controllers/users/payment');
const cartController = require('../controllers/users/cart');
const productController = require('../controllers/users/product');
const myaccountController = require('../controllers/users/myaccount');
const userController = require('../controllers/users/user');
const checkoutController = require('../controllers/users/checkout');
const homeController = require('../controllers/users/home');
const wishlistController = require('../controllers/users/wishlist');

// Home routes
userRoute.get("/", homeController.loadHome);

// Authentication routes
userRoute.get("/login", auth.existUser, userController.loginPage);
userRoute.get("/register", auth.existUser, userController.registerPage);
userRoute.post("/register", userController.getinsignup);
userRoute.post("/login", userController.getinlogin);
userRoute.get("/otp", userController.otpPage);
userRoute.post("/otp", userController.verifyOtp);
userRoute.get("/resendotp", userController.resendOtp);
userRoute.get("/forgetpass", userController.forgetpass);
userRoute.get("/newpass", userController.newpass);
userRoute.post("/newpass", userController.varifynewpass);
userRoute.post("/forgetpass", userController.updatepass);
userRoute.post("/logout", myaccountController.logout);

// Product routes
userRoute.get("/shop",  productController.shopPage);
userRoute.get("/product/:id",  productController.productpage);
userRoute.get('/searchProduct',productController.searchProduct);
userRoute.get('/shopFiltering',productController.shopFiltering);


// Cart routes
userRoute.get("/cart", auth.userIn, cartController.cartpage);
userRoute.post("/addtocart", auth.userIn, cartController.addtocart);
userRoute.post("/cartupdate", auth.userIn, cartController.cartupdate);
userRoute.post("/remove", auth.userIn, cartController.remove);

// Checkout routes
userRoute.get('/checkout', auth.userIn, checkoutController.checkout);
userRoute.post('/placeOrder', auth.userIn, checkoutController.placeOrder);
userRoute.patch('/checkoutAddAddress', auth.userIn, checkoutController.checkoutAddAddress);
userRoute.post('/loadEditAddress', auth.userIn, checkoutController.loadEditAddress);
userRoute.patch('/saveEditAddress', auth.userIn, checkoutController.saveEditAddress);
userRoute.patch('/removeAddress', auth.userIn, checkoutController.removeAddress);
userRoute.post('/couponFetch', auth.userIn, checkoutController.couponFetch);
userRoute.post('/couponSubmit', auth.userIn, checkoutController.couponSubmit);
userRoute.get('/thankyou', auth.userIn, checkoutController.thankyou);

// My Account routes
userRoute.get("/myaccount", auth.userIn, myaccountController.myaccount);
userRoute.post("/addAddress", auth.userIn, myaccountController.addAddress);
userRoute.post("/editUser/:id", auth.userIn, myaccountController.editUser);
userRoute.post("/updateprofile", auth.userIn, myaccountController.updateProfile);
userRoute.post("/addWallet", auth.userIn, myaccountController.addWallet);
userRoute.post("/razors", auth.userIn, myaccountController.razorPay);

userRoute.post("/editAddress", auth.userIn, myaccountController.editAddress);
userRoute.patch("/saveEdit", auth.userIn, myaccountController.saveEdit);
userRoute.get('/orderDetails/:id', auth.userIn, myaccountController.orderDetails);
userRoute.post('/order/cancel', auth.userIn, myaccountController.cancelOrder);
userRoute.post('/order/return', auth.userIn, myaccountController.returnOrder);
userRoute.patch('/returnOrder', auth.userIn, myaccountController.returnApprove);
userRoute.get('/getinvoice/:id',  auth.userIn,myaccountController.loadInvoice)
userRoute.post('/repayment/:id',  auth.userIn,myaccountController.repayment);

// Wishlist routes
userRoute.get('/wishlist',auth.userIn,  wishlistController.wishlist);
userRoute.post('/addtowishlist',auth.userIn,  wishlistController.addtowishlist);
userRoute.post("/wishlistupdate", auth.userIn, wishlistController.wishlistupdate);

// Payment routes
userRoute.post('/razor', auth.userIn, paymentController.razor);

// Error route
userRoute.get('/error-404',  userController.errorpage);

// Google Authentication routes
userRoute.get("/auth/google", googleLogin.googleAuth);
userRoute.get(
  "/auth/google/callback",
  googleLogin.googleCallback,
  googleLogin.setupSession
);

module.exports = userRoute;
