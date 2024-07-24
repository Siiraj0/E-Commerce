const wishlistModel = require('../../models/wishlistmodel');

const wishlist = async (req, res) => {
  try {
    const wishlist = await wishlistModel
      .findOne({ userId: req.session.userId })
      .populate("products.productId");

    res.render('user/wishlist', { wishlist, user: req.session.userId });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

const addtowishlist = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(201).send({ msg: "no user" });
    }

    const userId = req.session.userId;
    const productId = req.body.id;
    
    const existingWishlist = await wishlistModel.findOne({
      userId,
      products: { $elemMatch: { productId } },
    });

    if (!existingWishlist) {
      const newProduct = {
        productId,
        count: 1,
      };
      await wishlistModel.findOneAndUpdate(
        { userId },
        { $push: { products: newProduct } },
        { upsert: true, new: true }
      );
      res.send({ msg: "success" });
    } else {
      await wishlistModel.findOneAndUpdate(
        { userId, "products.productId": productId },
        { $inc: { "products.$.count": 1 } }
      );
      res.send({ msg: "success" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

const wishlistupdate = async (req, res) => {
  try {
    const userId = req.session.userId || req.body.userId;
    const { productId, count } = req.body;

    const updatedWishlist = await wishlistModel.findOneAndUpdate(
      { userId, "products.productId": productId },
      { $set: { "products.$.count": count } },
      { new: true }
    );

    if (!updatedWishlist) {
      throw new Error("Wishlist not found or product not found in the wishlist.");
    }
    res.status(200).send({ updatedWishlist });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ err: error.message });
  }
};

module.exports = {
  wishlist,
  addtowishlist,
  wishlistupdate,
};
