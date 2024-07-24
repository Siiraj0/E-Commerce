const cartModel = require("../../models/cartmodel");
const wishlistModal=require("../../models/wishlistmodel")
const cartpage = async (req, res) => {
  try {
    const cart = await cartModel
      .findOne({ userId: req.session.userId })
      .populate("products.productId");
   
    const countProduct = 0;
    res.render("user/cart", { cart, countProduct, user: req.session.userId });
  } catch (error) {
    console.log(error.message);
  }
};

const addtocart = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.send({ msg: "no user" }).status(201);
    }

   const wish= await wishlistModal.findOneAndUpdate({userId:req.session.userId},{$pull:{products:{productId:req.body.id}}},{new:true});
   console.log(wish);
    const userid = await cartModel.findOne({
      userId: req.session.userId,
      products: { $elemMatch: { productId: req.body.id } },
    });

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

const cartupdate = async (req, res) => {
  try {
    const userId = req.session.userId || req.body.userId;
    
    const upcart = await cartModel.findOneAndUpdate(
      { userId, "products.productId": req.body.productId },
      { $set: { "products.$.count": req.body.count } },
      { "products.$": 1 },
      { new: true }
    );

    if (!upcart) {
      throw new Error("Cart not found or product not found in the cart.");
    }
    res.status(200).send({ upcart });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ err: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const userId = req.session.userId._id;
    const productIdToRemove = req.body.id;
    const updatedCart = await cartModel.findOneAndUpdate(
      { userId: userId },
      { $pull: { products: { productId: productIdToRemove } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Product removed from cart', cart: updatedCart });
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  cartpage,
  addtocart,
  cartupdate,
  remove,
 
};
