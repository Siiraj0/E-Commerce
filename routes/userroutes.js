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

const userController = require("../controllers/usercontroller");

userRoute.get("/", userController.loadHome);
userRoute.get("/login", auth.existUser, userController.loginPage);
userRoute.get("/register", auth.existUser, userController.registerPage);
userRoute.get("/shop", userController.shopPage);
userRoute.get("/product/:id", userController.productpage);
userRoute.post("/register", userController.getinsignup);
userRoute.post("/login", userController.getinlogin);
userRoute.get("/otp", userController.otpPage);
userRoute.post("/otp", userController.verifyOtp);
userRoute.get("/resendotp", userController.resendOtp);
userRoute.get("/forgetpass", userController.forgetpass);
userRoute.get("/newpass", userController.newpass);
userRoute.post("/newpass", userController.varifynewpass);
userRoute.post("/forgetpass", userController.updatepass);
userRoute.get("/cart", auth.userIn, userController.cartpage);
userRoute.post("/addtocart", userController.addtocart);
userRoute.post("/cartupdate", userController.cartupdate);
userRoute.get("/myaccount", auth.userIn,userController.myaccount);
userRoute.post("/logout", userController.logout);
userRoute.post("/remove", userController.remove);

//Login With Google
userRoute.get("/auth/google", googleLogin.googleAuth);

userRoute.get(
  "/auth/google/callback",
  googleLogin.googleCallback,
  googleLogin.setupSession
);

module.exports = userRoute;
