const bcrypt = require("bcrypt");
const userModel = require("../../models/usermodel");
const nodemailer = require("nodemailer");
const usermodel = require("../../models/usermodel");
const categorymodel = require("../../models/categorymodel");
const { ObjectId } = require("mongodb");
const productmodel = require("../../models/productmodel");
const OTP = require("../../models/otpmodel");

const cartmodel = require("../../models/cartmodel");



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
      console.log(otp);

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
    console.log(joinedOtp);

    const storedOtp = await OTP.findOne({ userId: req.session?.userId?.email });
    console.log(storedOtp);
    let bb = storedOtp.otp;

    if (joinedOtp == bb) {
      console.log("jhhhhhhhhhhhhhh");
      if (req.session.forget) {
        res.redirect("/newpass");
        delete req.session.forget;
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
      req.session.userId=null;

      res.redirect("/login");
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

const varifynewpass = async (req, res) => {
  if (req.body.pass !== req.body.newpassword) return res.redirect("/newpass");

  try {
    const password = await hashPassword(req.body.pass);
    const user = await userModel.findOneAndUpdate(
      { _id: req.session.userId._id },
      { $set: { password } }
    );

    res.redirect("/login");
  } catch (error) {
    console.log(error.message);
  }
};

const lowToHigh = async (req, res) => {
  try {
    const limit = 8;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const productsCount = await productmodel.countDocuments({ isBlocked: false });
    const totalPages = Math.ceil(productsCount / limit);

    const userId = req.session.user_id;
    const cartItems = await cartmodel.findOne({ userId: userId }).populate('products.productId');
    const categories = await categorymodel.find({ isBlocked: false });

    const lowtohigh = await productmodel.find({ isBlocked: false }).sort({ price: 1 }).populate('category').skip(skip).limit(limit);

    res.render('user/shop', { showproducts: lowtohigh, cartItems, categories, currentPage: page, totalPages, productsCount });
  } catch (error) {
    console.log(error.message);
  }
};

const HighToLow = async (req, res) => {
  try {
    const limit = 8;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const productsCount = await productmodel.countDocuments({ isBlocked: false });
    const totalPages = Math.ceil(productsCount / limit);

    const userId = req.session.user_id;
    const cartItems = await cartmodel.findOne({ userId: userId }).populate('products.productId');
    const categories = await categorymodel.find({ isBlocked: false });

    const hightolow = await productmodel.find({ isBlocked: false }).sort({ price: -1 }).populate('category').skip(skip).limit(limit);

    res.render('user/shop', { showproducts: hightolow, cartItems, categories, currentPage: page, totalPages, productsCount });
  } catch (error) {
    console.log(error.message);
  }
};

const popularity = async (req, res) => {
  try {
    const limit = 8;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const productsCount = await productmodel.countDocuments({ isBlocked: false });
    const totalPages = Math.ceil(productsCount / limit);

    const userId = req.session.user_id;
    const cartItems = await cartmodel.findOne({ userId: userId }).populate('products.productId');
    const categories = await categorymodel.find({ isBlocked: false });

    const popularity = await order.aggregate([
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.productId',
          totalCount: { $sum: '$products.quantity' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productData'
        }
      },
      { $unwind: '$productData' },
      { $match: { 'productData.isBlocked': false } },
      { $sort: { totalCount: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);

    const popularProds = popularity.map(item => item.productData);

    res.render('user/shop', { showproducts: popularProds, cartItems, categories, currentPage: page, totalPages, productsCount });
  } catch (error) {
    console.log(error.message);
  }
};

const latest = async (req, res) => {
  try {
    const limit = 8;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const productsCount = await productmodel.countDocuments({ isBlocked: false });
    const totalPages = Math.ceil(productsCount / limit);

    const userId = req.session.user_id;
    const cartItems = await cartmodel.findOne({ userId: userId }).populate('products.productId');
    const categories = await categorymodel.find({ isBlocked: false });

    const showproducts = await productmodel.find({ isBlocked: false }).sort({ createdAt: -1 }).populate('category').skip(skip).limit(limit);

    res.render('user/shop', { showproducts, cartItems, categories, currentPage: page, totalPages, productsCount });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { lowToHigh, HighToLow, popularity, latest };



module.exports = {
  loginPage,
  registerPage,
  lowToHigh,
  HighToLow,
  popularity,
  latest,
  getinsignup,
  getinlogin,
  otpPage,
  verifyOtp,
  resendOtp,
  forgetpass,
  updatepass,
  newpass,

  varifynewpass,
};
