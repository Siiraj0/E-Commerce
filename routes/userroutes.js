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
userRoute.get("/shop", productController.shopPage);
userRoute.get("/product/:id", productController.productpage);
userRoute.get('/searchProduct',productController.searchProduct);
userRoute.get('/shopFiltering',productController.shopFiltering);


// Cart routes
userRoute.get("/cart", auth.userIn, cartController.cartpage);
userRoute.post("/addtocart", cartController.addtocart);
userRoute.post("/cartupdate", cartController.cartupdate);
userRoute.post("/remove", cartController.remove);

// Checkout routes
userRoute.get('/checkout', auth.userIn, checkoutController.checkout);
userRoute.post('/placeOrder', checkoutController.placeOrder);
userRoute.patch('/checkoutAddAddress', checkoutController.checkoutAddAddress);
userRoute.post('/loadEditAddress', checkoutController.loadEditAddress);
userRoute.patch('/saveEditAddress', checkoutController.saveEditAddress);
userRoute.patch('/removeAddress', checkoutController.removeAddress);
userRoute.post('/couponFetch', checkoutController.couponFetch);
userRoute.post('/couponSubmit', checkoutController.couponSubmit);
userRoute.get('/thankyou', checkoutController.thankyou);

// My Account routes
userRoute.get("/myaccount", auth.userIn, myaccountController.myaccount);
userRoute.post("/addAddress", myaccountController.addAddress);
userRoute.post("/editUser/:id", myaccountController.editUser);
userRoute.post("/updateprofile", auth.userIn, myaccountController.updateProfile);
userRoute.post("/addWallet", myaccountController.addWallet);
userRoute.post("/razors", myaccountController.razorPay);

userRoute.post("/editAddress", myaccountController.editAddress);
userRoute.patch("/saveEdit", myaccountController.saveEdit);
userRoute.get('/orderDetails/:id', auth.userIn, myaccountController.orderDetails);
userRoute.post('/order/cancel', myaccountController.cancelOrder);
userRoute.post('/order/return', myaccountController.returnOrder);
userRoute.patch('/returnOrder', myaccountController.returnApprove);
userRoute.get('/getinvoice/:id', myaccountController.loadInvoice)
userRoute.post('/repayment/:id', myaccountController.repayment);

// Wishlist routes
userRoute.get('/wishlist',auth.userIn,  wishlistController.wishlist);
userRoute.post('/addtowishlist',auth.userIn,  wishlistController.addtowishlist);
userRoute.post("/wishlistupdate", wishlistController.wishlistupdate);

// Payment routes
userRoute.post('/razor', paymentController.razor);

// Error route
userRoute.get('/error-404', userController.errorpage);

// Google Authentication routes
userRoute.get("/auth/google", googleLogin.googleAuth);
userRoute.get(
  "/auth/google/callback",
  googleLogin.googleCallback,
  googleLogin.setupSession
);

module.exports = userRoute;
