const orderModel= require('../../models/ordermodel')
const cartModel = require('../../models/cartmodel')


const indexPage = (req, res) => {
    try {
      res.render("admin/index");
    } catch (error) {
      console.log(error.messege);
    }
  };


  const salesData= async (req,res)=>{
    try {
      // Simulate fetching data, replace this with your actual data fetching logic
      const data = {
          labels: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01', '2023-07-01'],
          sales: [65000, 59000, 80000, 81000, 56000, 55000, 40000],
          revenue: [120000, 110000, 150000, 140000, 130000, 100000, 90000]
      };

      res.json(data);
  } catch (error) {
      console.error('Error fetching sales data:', error);
      res.status(500).send('Internal Server Error');
  }
  }


  const salesChart=async(req,res)=>{
    const currentYear = new Date().getFullYear();

    const salesData = await orderModel.aggregate([
        {
            $match: {
                orderDate: {
                    $gte: new Date(`${currentYear}-01-01`), // Start of the year
                    $lt: new Date(`${currentYear + 1}-01-01`) // Start of next year
                }
            }
        },
        {
            $group: {
                _id: { $month: "$orderDate" },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 } // Sort by month
        }
    ]);

    // Initialize array for 12 months
    const monthlyCounts = Array(12).fill(0);

    // Map aggregation results to the array
    salesData.forEach(item => {
        monthlyCounts[item._id - 1] = item.count;
    });
    console.log(monthlyCounts,'ajajaj');
    res.send({monthlyCounts})
  }


  

  
  

module.exports={
    indexPage,
    salesData,
    salesChart,
    
}