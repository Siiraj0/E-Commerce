
const adminModel = require("../../models/adminmodel");




const adminLogin = (req, res) => {
    try {
      res.render("admin/login");
    } catch (error) {
      console.log(error.messege);
    }
  };

  
  const getInAdmin = async (req, res) => {
    try {
      console.log(req.body,'adminnnn');
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
  
  const logout = (req, res) => {
    try {
      req.session.admin = null

      res.redirect('/admin/login')
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };

  module.exports={
    adminLogin,
    getInAdmin,
    logout
  }