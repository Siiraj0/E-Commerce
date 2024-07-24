const express = require("express");
const userRoute = express();
const session = require("express-session");
const auth = require("../middlewares/user");
const googleLogin = require("../passport");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
userRoute.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);
userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));

const paymentController= require('../controllers/users/payment')
const cartController = require('../controllers/users/cart')
const productController=require('../controllers/users/product')
const myaccountController= require('../controllers/users/myaccount')
const userController=require('../controllers/users/user')
const checkoutController=require('../controllers/users/checkout')
const homeContoller=require('../controllers/users/home')
const wishlistController = require('../controllers/users/wishlist')

userRoute.get("/", homeContoller.loadHome);
userRoute.get("/login", auth.existUser, userController.loginPage);
userRoute.get("/register", auth.existUser, userController.registerPage);
userRoute.get("/shop", productController.shopPage);
userRoute.get("/product/:id", productController.productpage);
userRoute.post("/register", userController.getinsignup);
userRoute.post("/login", userController.getinlogin);
userRoute.get("/otp", userController.otpPage);
userRoute.post("/otp", userController.verifyOtp);
userRoute.get("/resendotp", userController.resendOtp);
userRoute.get("/forgetpass", userController.forgetpass);
userRoute.get("/newpass", userController.newpass);
userRoute.post("/newpass", userController.varifynewpass);
userRoute.post("/forgetpass", userController.updatepass);
userRoute.get("/cart", auth.userIn, cartController.cartpage);
userRoute.post("/addtocart", cartController.addtocart);
userRoute.post("/cartupdate", cartController.cartupdate);
userRoute.get("/myaccount", auth.userIn,myaccountController.myaccount);
userRoute.post("/logout", myaccountController.logout);
userRoute.post("/remove", cartController.remove);
userRoute.get('/checkout',auth.userIn,checkoutController.checkout)
userRoute.post("/addAddress", myaccountController.addAddress);
userRoute.post("/editUser/:id", myaccountController.editUser);
userRoute.get('/orderDetails/:id',myaccountController.loadOrderDetails)
userRoute.patch('/checkoutAddAddress',checkoutController.checkoutAddAddress)
userRoute.post('/placeOrder',checkoutController.placeOrder)
userRoute.get('/shop/lowToHigh',userController.lowToHigh)
userRoute.get('/shop/popularity',userController.popularity)
userRoute.get('/shop/highToLow',userController.HighToLow)
userRoute.get('/shop/latest',userController.latest)
userRoute.get('/thankyou',checkoutController.thankyou)
userRoute.post('/razor',paymentController.razor)
userRoute.get('/wishlist',wishlistController.wishlist)
userRoute.post('/addtowishlist',wishlistController.addtowishlist)
userRoute.post("/wishlistupdate", wishlistController.wishlistupdate);
userRoute.post("/updateprofile", auth.userIn, myaccountController.updateProfile);
userRoute.post("/addWallet",  myaccountController.addWallet);
userRoute.post("/razors",  myaccountController.razorPay);


//Login With Google
userRoute.get("/auth/google", googleLogin.googleAuth);
userRoute.get(
  "/auth/google/callback",
  googleLogin.googleCallback,
  googleLogin.setupSession
);

module.exports = userRoute;
