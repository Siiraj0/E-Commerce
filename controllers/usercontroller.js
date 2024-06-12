const bcrypt = require("bcrypt");
const userModel = require("../models/usermodel");
const nodemailer = require("nodemailer");
const usermodel = require("../models/usermodel");
const categorymodel = require("../models/categorymodel");
const { ObjectId } = require("mongodb");
const productModel = require("../models/productmodel");
const OTP = require("../models/otpmodel");
const cartModel = require("../models/cartmodel");
const cartmodel = require("../models/cartmodel");

const loadHome = async (req, res) => {
  try {
    const countProduct = await productModel.countDocuments({
      isBlocked: false,
    });

    res.render("user/index", { countProduct, user: req.session.userId });
  } catch (error) {
    console.log(error.message);
  }
};

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(`Hashed password: ${hashedPassword}`);
    return hashedPassword;
  } catch (error) {
    console.error(`Error hashing password: ${error}`);
  }
}

const loginPage = async (req, res) => {
  try {
    const msg = req.flash("msg");
    res.render("user/login", { msg });
  } catch (error) {
    console.log(error.message);
  }
};

const registerPage = async (req, res) => {
  try {
    res.render("user/register");
  } catch (error) {
    console.log(error.message);
  }
};

//for sending mail

const sendVarifyMail = async (otp, name, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sirajkp752@gmail.com",
        pass: "rzyv ugjm nzak edpm",
      },
    });
    const mailoptions = {
      from: "sirajkp752@gmail.com",
      to: email,
      subject: "For Varification mail",
      html: `<p>hii+${name}+ ${otp}`,
    };
    transporter.sendMail(mailoptions, function (error, info) {
      if (error) {
        console.log(mailoptions, error);
      } else {
        console.log("Email has been sent:-", info.response);
      }
    });
  } catch (error) {
    console.log(error.messege);
  }
};

const getinsignup = async (req, res) => {
  console.log("body", req.body);
  console.log(req.body.name);
  console.log(req.body.password);
  console.log(req.body.mobile);
  console.log(req.body.email);

  try {
    const userExist = await userModel.findOne({ email: req.body.email });

    if (userExist) {
      res.redirect("/register");
    } else {
      // Example usage

      const password = await hashPassword(req.body.password);

      const user = new usermodel({
        name: req.body.name,
        email: req.body.email,
        password: password,
        mobile: req.body.mobile,
        isVerified: 1,
      });

      req.session.userId = user;
      console.log(req.session.userId, "req.session.userId");
      const otp = generateOtp();

      // Save OTP to the database
      const otpDB = new OTP({
        otp: otp,
        userId: req.session.userId.email, // Assuming you have access to the user ID
      });
      await otpDB.save();

      // Send OTP via email
      await sendVarifyMail(otp, req.body.name, req.body.email);

      res.redirect("/otp");
    }
  } catch (error) {
    // Handle errors appropriately
    console.error("Error in getinsignup:", error);
    res.status(500).send("Internal Server Error");
  }
};

const shopPage = async (req, res) => {
  try {
    const productData = await productModel.find({ isBlocked: false });
    const countProduct = await productModel.countDocuments({
      isBlocked: false,
    });
    console.log(productData);

    res.render("user/shop", { productData, countProduct });
  } catch (error) {
    console.log(error.message);
  }
};

const productpage = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await productModel.findOne({ _id: id });
    const countProduct = await productModel.countDocuments({
      isBlocked: false,
    });

    res.render("user/product", { productData, countProduct });
  } catch (error) {
    console.log(error.message);
  }
};

const getinlogin = async (req, res) => {
  try {
    const data = await usermodel.findOne({ email: req.body.email });
    if (data) {
      const pass = await bcrypt.compare(req.body.password, data.password);

      if (pass) {
        req.session.userId = data;
        res.redirect("/");
      } else {
        // req.flash('msg','password wrong')
        req.flash("msg", "password is wrong");
        res.redirect("/login");
      }
    } else {
      // req.flash('msg',"email not exist")
      req.flash("msg", "email is wrong");

      res.redirect("/login");
    }
  } catch (error) {
    console.log(error.message + "getinlogin");
  }
};

const otpPage = (req, res) => {
  try {
    const msg = req.flash("msg");
    console.log(msg, "gsakjghj");
    res.render("user/otp", { msg });
  } catch (error) {
    console.log(error.message);
  }
};

const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

const verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp;
    console.log(otp, "otp");
    const joinedOtp = otp.join("");

    const storedOtp = await OTP.findOne({ userId: req.session?.userId?.email });
    console.log(storedOtp);
    let bb = storedOtp.otp;

    if (joinedOtp == bb) {
      console.log("jhhhhhhhhhhhhhh");
      if (req.session.forget) {
        res.redirect("/newpass");
        delete req.session.forget;
        req.session.newpass = true;
        return;
      }

      const user = new usermodel({
        name: req.session.userId.name,
        email: req.session.userId.email,
        password: req.session.userId.password,
        mobile: req.session.userId.mobile,
        isVerified: 1,
      });

      await user.save();

      res.redirect("/");
    } else {
      req.flash("msg", "otp incorrect");

      res.redirect("/otp");
      console.log("its fialedddddddd");
    }
  } catch (error) {
    console.log(error.messege);
  }
};

const resendOtp = async (req, res) => {
  try {
    if (!req.session.userId) {
      console.log("sessionnnn");
      res.redirect("/register");
      return;
    }

    await OTP.deleteOne({ userId: req.session.userId.email });
    const newOTP = generateOtp();

    const otpDB = new OTP({
      otp: newOTP,
      userId: req.session.userId.email,
    });
    await otpDB.save();

    console.log(otpDB, "chggh");
    await sendVarifyMail(
      newOTP,
      req.session.userId.name,
      req.session.userId.email
    );
    res.redirect("/otp");
  } catch (error) {
    console.error("Error during OTP resend:", error.message);
    res.redirect("/register");
  }
};

const forgetpass = (req, res) => {
  try {
    const msg = req.flash("msg");

    res.render("user/forgetpass", { msg });
  } catch (error) {
    console.log(error.message);
  }
};

const updatepass = async (req, res) => {
  try {
    const userData = await usermodel.findOne({ email: req.body.email });
    if (userData) {
      const updateotp = generateOtp();
      const upotp = new OTP({
        otp: updateotp,
        userId: req.body.email,
      });
      await upotp.save();
      console.log(updateotp, "upDATEOTP");
      req.session.userId = userData;
      req.session.forget = true;
      await sendVarifyMail(updateotp, userData.name, userData.email);
      res.redirect("/otp").status(200);
    } else {
      req.flash("msg", "no email");
      res.redirect("/forgetpass");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const newpass = (req, res) => {
  try {
    res.render("user/newpass");
  } catch (error) {
    console.log(error.messege);
  }
};

const cartpage = async (req, res) => {
  try {
    console.log("lsdjfksaj");
    const cart = await cartModel
      .findOne({ userId: req.session.userId })
      .populate("products.productId");
    console.log(cart, "hsgjfhag");
    const countProduct = 0;
    res.render("user/cart", { cart, countProduct });
  } catch (error) {
    console.log(error.messege);
  }
};

const addtocart = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.send({ msg: "no user" }).status(201);
    }

    const userid = await cartModel.findOne({
      userId: req.session.userId,
      products: { $elemMatch: { productId: req.body.id } },
    });
    console.log(userid);

    if (!userid) {
      const pro = {
        productId: req.body.id,
        count: 1,
      };
      const addcart = await cartModel.findOneAndUpdate(
        { userId: req.session.userId },
        { $push: { products: pro } },
        { upsert: true, new: true }
      );
      console.log(addcart);
      res.send({ msg: "success" });
    } else {
      await cartModel.findOneAndUpdate(
        { userId: req.session.userId, "products.productId": req.body.id },
        { $inc: { "products.$.count": 1 } }
      );
      res.send({ msg: "success" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const varifynewpass = async (req, res) => {
  if (req.body.pass !== req.body.newpassword) return res.redirect("/newpass");

  try {
    console.log(req.session.userId);
    const password = await hashPassword(req.body.pass);
    const user = await userModel.findOneAndUpdate(
      { _id: req.session.userId._id },
      { $set: { password } }
    );
    console.log(user, "aakka");

    res.redirect("/login");

    console.log(req.session?.userId, "akkakakakaka");
  } catch (error) {
    console.log(error.message);
  }
};

const cartupdate = async (req, res) => {
  try {
    console.log("hello");
    console.log(req.body.count);
    const userId = req.session.userId || req.body.userId;
    console.log(userId);
    const upcart = await cartmodel.findOneAndUpdate(
      { userId, "products.productId": req.body.productId },
      { $set: { "products.$.count": req.body.count } },
      { "products.$": 1 },
      { new: true }
    );
    console.log(upcart);
    if (!upcart) {
      throw new Error("Cart not found or product not found in the cart.");
    }
    res.status(200).send({ upcart });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ err: error.message });
  }
};

const myaccount = (req, res) => {
  try {
    console.log(req.session.userId + "shahzad ");
    // const user = userModel.findOne({_id:req.session.userId._id})
    res.render("user/myaccount", { user: req.session.userId });
  } catch (error) {
    console.log(error.messege);
  }
};

const logout = (req, res) => {
  try {
    req.session.userId = null;
    res.json({ status: true });
  } catch (error) {
    console.log(error.messege);
  }
};

const remove = async (req, res) => {
  try {
    const userId = req.session.userId._id;
    const productIdToRemove = req.body.id;
    const updatedCart = await cartmodel.findOneAndUpdate(
      { userId: userId },
      { $pull: { products: { productId: productIdToRemove } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
  }

    res.status(200).json({ message: 'Product removed from cart', cart: updatedCart });
  } catch (error) {
  console.log(error.messege);

  }
};

module.exports = {
  loadHome,
  loginPage,
  registerPage,
  shopPage,
  productpage,
  getinsignup,
  getinlogin,
  otpPage,
  verifyOtp,
  resendOtp,
  forgetpass,
  updatepass,
  newpass,
  cartpage,
  addtocart,
  varifynewpass,
  cartupdate,
  myaccount,
  logout,
  remove,
};
