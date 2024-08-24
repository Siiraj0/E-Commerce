const orderModel= require('../../models/ordermodel')
const cartModel = require('../../models/cartmodel')
const XLSX = require('xlsx');



const loadorders = async(req, res) => {
  try{
      const limit = 5;
      const page =parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;
      const totalProsCount = await orderModel.countDocuments();
      const totalPages = Math.ceil(totalProsCount / limit);

      const orders =await orderModel.find({}).populate("userId").skip(skip)
      .limit(limit)
      .sort({ _id: -1 });

      res.render('admin/orders',{orders ,totalPages, currentPage: page })
  }catch(error){
      console.log(error.message);
  }
}

const orderDetails=async (req,res)=>{
try {
  const orderId = req.params.id
  const orders =await orderModel.findOne({_id:orderId}).populate("products.productId")
    
 res.render('admin/orderdetails',{orders})
} catch (error) {
  console.log(error.message);
}
}
  
const salesReport = async (req, res) => {
  try {
    const limit = 5; 
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    let startDate, endDate;
    const { sort, startDate: customStartDate, endDate: customEndDate } = req.query;
    let filter = {};
    const now = new Date();
    
    // Apply sorting filter and calculate start and end dates
    if (sort) {
      switch (sort) {
        case 'day':
          startDate = new Date(now.setDate(now.getDate() - 1));
          endDate = new Date();
          break;
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          endDate = new Date();
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          endDate = new Date();
          break;
        case 'year':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          endDate = new Date();
          break;
        case 'custom':
          if (customStartDate && customEndDate) {
            startDate = new Date(customStartDate);
            endDate = new Date(customEndDate);
          }
          break;
        default:
          startDate = endDate = null;
          break;
      }

      if (startDate && endDate) {
        filter.orderDate = { $gte: startDate, $lte: endDate };
      }
    }

    // Count documents based on the filter
    const totalProsCount = await orderModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProsCount / limit);

    // Fetch filtered and paginated orders
    const orders = await orderModel
      .find(filter)
      .populate('products.productId')
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 }); // Sort orders by most recent

    // Render the sales report with the fetched orders and the pagination details
    res.render('admin/salesReport', { 
      orders, 
      sort, 
      startDate, 
      endDate, 
      totalPages, 
      currentPage: page 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
};



const updateOrderStatus = async (req, res) => {
  try {
      const { orderId, newStatus } = req.body;

      const result = await orderModel.updateOne(
          { 'products._id': orderId },
          { $set: { 'products.$.orderStatus': newStatus } }
      );

      // Check if a document was matched, even if no modifications were needed
      if (result.nModified > 0 || result.matchedCount > 0) {
          console.log('Order status updated successfully.');
          res.json({ success: true });
      } else {
          console.log('Order status not updated. Order might not be found.');
          res.json({ success: false, message: 'Order status not updated. Order might not be found.' });
      }
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};






const searchOrders = async (req, res) => {
  try {
      const searchTerm = req.query.term || ''; // Default to empty string if term is not provided
      const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search

      console.log(`Searching for term: ${searchTerm}`); // Log search term for debugging

      // Find orders that match the search term in user name, order amount, or payment
      const orders = await orderModel.find({
          $or: [
              { 'userId.name': { $regex: regex } },
              { 'orderAmount': { $regex: regex } },
              { 'payment': { $regex: regex } },
              // Add more fields if needed
          ]
      }).populate('userId');

      console.log(`Found orders: ${orders.length}`); // Log number of orders found

      res.json(orders);
  } catch (error) {
      console.error('Error searching orders:', error.message); // Log detailed error message
      res.status(500).send({ error: 'Internal server error' });
  }
};

const loadReturnRequets = async(req, res) =>{
  try{
      const returnProduct = await orderModel.aggregate([

          {$unwind : "$products"},
          {$match: {"products.orderStatus" : "Return Requested"}},
          {$group : {
              _id : "$products.productId",
              orderId : {$first: "$_id"},
              productId : {$first: "$products.productId"},
              quantity : {$first : "$products.quantity"},
              returnReason : {$first : "$products.returnReason"},
              userId : {$first: "$userId"},
              totalPrice : {$first : "$products.totalPrice"},
              orderDate  : {$first : "$orderDate"}
          }},
          {
              $lookup: {
                  from: "products",
                  localField: "productId",
                  foreignField: "_id",
                  as: "productDetails"
              }
          },
          { $unwind: "$productDetails" }
          
      ])
      console.log(returnProduct,'returnProduct');
      res.render('admin/returnRequests',{products:returnProduct})
  }catch(error){
      console.log(error.message);
  }
}


const downloadSalesReport = async (req, res) => {
  try {
    // Fetch data (you can apply filters as needed)
    const orders = await orderModel.find({}).populate('products.productId');

    // Create a new workbook and a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheetData = orders.map(order => ({
      'Order Date': order.orderDate.toDateString(),
      'Order Amount': order.orderAmount,
      'Coupon Discount': order.couponDiscount,
      'Count': order.products.length,
      'Status': order.products[0].orderStatus
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Report');

    // Convert workbook to buffer
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Send the buffer as an Excel file
    res.setHeader('Content-Disposition', 'attachment; filename=sales_report.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    console.error('Error generating Excel report:', error);
    res.status(500).send('Error generating report');
  }
};

module.exports = {
  loadorders,
  orderDetails,
  salesReport,
  updateOrderStatus,
  searchOrders,
  loadReturnRequets,
  downloadSalesReport
};
