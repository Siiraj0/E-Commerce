const cartModel = require("../../models/cartmodel");
const wishlistModel = require("../../models/wishlistmodel");
const Product = require("../../models/productmodel");
const validate=require('../../util/productValidate')
const cartpage = async (req, res) => {
  try {
    await validate(req.session.userId)
    const cart = await cartModel
      .findOne({ userId: req.session.userId })
      .populate("products.productId");

    if (cart) {
      cart.products = cart.products.map(item => {
        if (item.productId.offer) {
          item.productId.offerPrice = Math.floor(item.productId.price * (1 - item.productId.offer.percentage / 100));
        } else {
          item.productId.offerPrice = item.productId.price;
        }
        return item;
      });
    }

    const userId = req.session.userId

    const countProduct = cart ? cart.products.length : 0;
    res.render("user/cart", { cart, countProduct, user: req.session.userId });
  } catch (error) {
    console.log(error.message);
  }
};

const addtocart = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).send({ msg: "no user" });
    }

    await wishlistModel.findOneAndUpdate(
      { userId: req.session.userId },
      { $pull: { products: { productId: req.body.id } } },
      { new: true }
    );

    const userid = await cartModel.findOne({
      userId: req.session.userId,
      products: { $elemMatch: { productId: req.body.id } },
    });

    if (!userid) {
      const product = await Product.findById(req.body.id);
      const pro = {
        productId: req.body.id,
        count: req.body.qty || 1,
      };

      if (product.offer) {
        pro.offerPrice = Math.floor(product.price * (1 - product.offer.percentage / 100));
      } else {
        pro.offerPrice = product.price;
      }

      await cartModel.findOneAndUpdate(
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
    const product = await Product.findById(req.body.productId);

    let updateFields = {
      "products.$.count": req.body.count
    };

    if (product.offer) {
      updateFields["products.$.offerPrice"] = Math.floor(product.price * (1 - product.offer.percentage / 100));
    } else {
      updateFields["products.$.offerPrice"] = product.price;
    }

    const upcart = await cartModel.findOneAndUpdate(
      { userId, "products.productId": req.body.productId },
      { $set: updateFields },
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
    const userId = req.session.userId;
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
