const orderModel = require("../../models/ordermodel");
const adminmodel = require("../../models/adminmodel");

const getStoredAdmin = async (req, res) => {
  try {
    const data = await adminmodel.findOne({ _id: req.body.adminId });

    if (data) {
      req.session.admin = data._id;
      res.status(200).send({ result: true });
    } else {
      res.status(200).send({ result: false });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const indexPage = (req, res) => {
  try {
    res.render("admin/index", { admin: req.session.admin });
  } catch (error) {
    console.log(error.messege);
  }
};

const recentOrder = async (req, res) => {
  try {
    const recentOrders = await orderModel
      .find({})
      .sort({ orderDate: -1 })
      .populate("userId")
      .select({ userId: 1, products: 1, orderDate: 1 })
      .limit(6);
    res.send({ result: recentOrders });
  } catch (error) {
    console.log(error.messege);
  }
};

const salesData = async (req, res) => {
  try {
    const data = {
      labels: [
        "2023-01-01",
        "2023-02-01",
        "2023-03-01",
        "2023-04-01",
        "2023-05-01",
        "2023-06-01",
        "2023-07-01",
      ],
      sales: [65000, 59000, 80000, 81000, 56000, 55000, 40000],
      revenue: [120000, 110000, 150000, 140000, 130000, 100000, 90000],
    };

    res.json(data);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const Topusers = async (req, res) => {
  try {
    const topUsers = await orderModel.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$userId",
          totalQuantity: { $sum: "$products.quantity" },
          price: { $sum: "$products.totalPrice" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$userDetails.name",
          totalQuantity: 1,
          price: 1,
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 4 },
    ]);

    res.send({ result: topUsers });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const salesChart = async (req, res) => {
  const currentYear = new Date().getFullYear();

  const salesData = await orderModel.aggregate([
    {
      $match: {
        orderDate: {
          $gte: new Date(`${currentYear}-01-01`),
          $lt: new Date(`${currentYear + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$orderDate" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const monthlyCounts = Array(12).fill(0);

  salesData.forEach((item) => {
    monthlyCounts[item._id - 1] = item.count;
  });

  res.send({ monthlyCounts });
};


const stausCount = async (req, res) => {
  try {
    const statusCounts = await orderModel.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.orderStatus",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          orderStatus: "$_id",
          count: 1,
        },
      },
    ]);

    const statusCountObj = {};
    statusCounts.forEach((status) => {
      statusCountObj[status.orderStatus] = status.count;
    });

    res.send({ statusCountObj });
  } catch (error) {
    console.log(error.messege);
  }
};

const slaesByCat = async (req, res) => {
  try {
    const salesData = await orderModel.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          totalSold: { $sum: "$products.quantity" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      {
        $project: {
          _id: 0,
          categoryName: "$categoryDetails.name",
          count: "$totalSold",
        },
      },
    ]);

    const salesByCategory = salesData.reduce((acc, item) => {
      acc[item.categoryName] = item.count;
      return acc;
    }, {});

    res.send({ result: salesByCategory });
  } catch (err) {
    console.log(err.messege);
  }
};

const erningByItem = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

const manageOrders = async (req, res) => {
  try {
    const data = await orderModel.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$products.productId",
          productName: { $first: "$productDetails.name" },
          productPrice: { $first: "$productDetails.price" },
          productImage:{ $first: { $arrayElemAt: ["$productDetails.image", 0] }},
          totalQuantityBought: { $sum: "$products.quantity" },
          stockLeft: { $first: "$productDetails.stock" },
          totalAmount: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"],
            },
          },
        },
      },
      {
        $project: {
            _id: 0,
            productId: "$_id",
            productName: 1,
            productPrice: 1,
            totalQuantityBought: 1,
            stockLeft: {
                $subtract: ["$stockLeft", "$totalQuantityBought"]
            },
            totalAmount: 1,
            productImage:1
        }
    },{$limit:5}
    ]);
    res.status(200).send({result:data})
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  indexPage,
  salesData,
  salesChart,
  stausCount,
  slaesByCat,
  recentOrder,
  Topusers,
  getStoredAdmin,
  erningByItem,
  manageOrders,
};
