const productModel = require('../../models/productmodel');
const categorymodel = require("../../models/categorymodel");


const categoryPage = async (req, res) => {
    try {
      const findcategorys = await categorymodel.find({});
      res.render("admin/category", { findcategorys });
    } catch (error) {
      console.log(error.messege);
    }
  };

  const addcategorypage = (req, res) => {
    try {
      const msg = req.flash('msg')
      res.render("admin/addcategory",{msg});
    } catch (error) {
      console.log(error.messege);
    }
  };

  const newcategory =async (req, res) => {
    try {
      if(req.body.name.trim()==''||req.body.description.trim()==''){
       req.flash('msg','fill the all fields')
       res.redirect('/admin/addcategory') 
       return
      }
      const pattern = new RegExp(`^${req.body.name}$`, 'i');
      
        const existCategory= await categorymodel.findOne({name: pattern})
        if(existCategory){
          req.flash('msg','category already exist')
          res.redirect('/admin/addcategory')
          return 
        }
        
      
      const category = new categorymodel({
        name: req.body.name,
        description: req.body.description,
      });
      category.save();
      res.redirect("/admin/category");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const editCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      const { name, description } = req.body;
  
      const category = await categorymodel.findByIdAndUpdate(
        { _id: categoryId },
        {
          name: name,
          description: description,
        }
      );
      // Send appropriate response
      res.redirect("/admin/category");
    } catch (error) {
      console.log(error.message);
      // Send error response
    }
  };
  
  
  const blockCategory= async (req,res)=>{
    try {
      const categoryId=req.body.categoryId;
      const categoryData=await categorymodel.findOne({_id : categoryId})
  
  
      if(categoryData){
        categoryData.isBlocked = !categoryData.isBlocked
        categoryData.save()
        res.send({success:true})
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const searchCategory = async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search

        const categories = await categorymodel.find({
            name: { $regex: regex }
        });

        res.json(categories);
    } catch (error) {
        console.error('Error searching categories:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

  

  module.exports={
    addcategorypage,
    newcategory,
    editCategory,
    blockCategory,
    categoryPage,
    searchCategory
  }