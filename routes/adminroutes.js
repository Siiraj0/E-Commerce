const express = require("express");
const adminController = require("../controllers/admincontroller");
const adminRoute = express();
adminRoute.use(express.json());
adminRoute.use(express.urlencoded({ extended: true }));
const auth = require("../middlewares/admin");

adminRoute.get("/login", auth.logout, adminController.adminLogin);
adminRoute.get("/index", auth.login, adminController.indexPage);
adminRoute.get("/user", adminController.userPage);
adminRoute.get("/category", adminController.categoryPage);
adminRoute.get("/product", adminController.productPage);
adminRoute.get("/addproduct", adminController.addProductpage);
adminRoute.get("/editproduct/:id", adminController.editProductpage);
adminRoute.post("/editproduct/:id", adminController.editandupdateProduct);
adminRoute.post("/addproduct", adminController.newProduct);
adminRoute.get("/addcategory", adminController.addcategorypage);
adminRoute.post("/addcategory", adminController.newcategory);
adminRoute.post("/login", adminController.getInAdmin);
adminRoute.post("/blockuser", adminController.blockUser);
adminRoute.post("/editcategory/:id", adminController.editCategory);
adminRoute.post("/blockcategory", adminController.blockCategory);
adminRoute.post("/blockproduct", adminController.blockProduct);

module.exports = adminRoute;
