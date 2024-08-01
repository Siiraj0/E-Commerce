const couponModel= require('../../models/coupon')

const loadCoupons = async (req,res)=>{
    try {
        const limit = 5;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const totalCouponsCount = await couponModel.countDocuments();
        const totalPages = Math.ceil(totalCouponsCount / limit)

        const couponData = await couponModel.find({})
        
        res.render('admin/coupons',{couponData ,totalPages, currentPage: page })
    } catch (error) {
        console.log(error.messege);
    }
}

function generateRandomString() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let randomString = '';
  
    for (let i = 0; i < 5; i++) {
      randomString += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  
    for (let i = 0; i < 3; i++) {
      randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  
    // Shuffle the string to ensure random order
    randomString = randomString.split('').sort(() => Math.random() - 0.5).join('');
  
    return randomString;
}
  


const addCoupons = async (req, res) => {
    try {
        const { couponname, couponDescription, percentage, endDate, minAmount, count } = req.body;


        if (!couponname || !couponDescription || !percentage || !endDate || !minAmount || !count) {
            console.log('Validation error: Missing required fields');
            return res.status(400).send("All fields are required");
        }

        // Ensure percentage is a number and within a reasonable range (e.g., 0-100)
        const percentageNum = parseFloat(percentage);
        if (isNaN(percentageNum) || percentageNum < 0 || percentageNum > 100) {
            console.log('Validation error: Invalid percentage value');
            return res.status(400).send("Invalid percentage value");
        }

        // Ensure minAmount is a number
        const minAmountNum = parseFloat(minAmount);
        if (isNaN(minAmountNum)) {
            console.log('Validation error: Invalid minimum amount value');
            return res.status(400).send("Invalid minimum amount value");
        }

        // Ensure count is a number and greater than 0
        const countNum = parseInt(count, 10);
        if (isNaN(countNum) || countNum <= 0) {
            console.log('Validation error: Invalid count value');
            return res.status(400).send("Invalid count value");
        }

        // Ensure endDate is a valid date
        const endDateObj = new Date(endDate);
        if (isNaN(endDateObj.getTime())) {
            console.log('Validation error: Invalid end date');
            return res.status(400).send("Invalid end date");
        }

        const couponCode = generateRandomString();
        

        const addedCoupon = await couponModel.create({
            couponName: couponname,
            couponCode: couponCode,
            couponDescription: couponDescription,
            percentage: percentageNum,
            minAmount: minAmountNum,
            count: countNum,
            startDate: new Date(),
            endDate: endDateObj
        });

        console.log('Coupon added:', addedCoupon);
        if (addedCoupon) {
            return res.redirect('/admin/coupons');
        }

        // If addingCoupon is null or undefined, return an error
        console.log('Error: Failed to add coupon');
        return res.status(500).send("Failed to add coupon");

    } catch (error) {
        console.error('Internal server error:', error.message);
        return res.status(500).send("Internal server error");
    }
};

const saveEditCoupon = async (req, res) => {
    try {

        const {
            couponId,
            couponName,
            couponPercentage,
            couponDescription,
            couponMinAmount,
            couponExpiryDate,
            couponCount
        } = req.body;

     
        const saved = await couponModel.findOneAndUpdate(
            { _id: couponId },
            {
                $set: {
                    couponName,
        
                    percentage: couponPercentage,
                    couponDescription,
                    minAmount: couponMinAmount,
                    endDate: couponExpiryDate,
                    count: couponCount
                }
            }
        );

        res.json({ success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server error" });
    }
};


const editdata = async (req, res) => {
    try {
        const idd = req.body.id;
        const findingCoupon = await couponModel.findOne({_id: idd});
        res.json({
            couponName: findingCoupon.couponName,
            couponCode: findingCoupon.couponCode,
            couponDescription: findingCoupon.couponDescription,
            percentage: findingCoupon.percentage,
            minAmount: findingCoupon.minAmount,
            endDate: findingCoupon.endDate,
            count: findingCoupon.count  // New line
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Server error"});
    }
}


const validateCoupon = async(req, res) =>{
    try{
        const {couponCode} = req.body
        const foundCoupon = await coupon.findOne({couponCode : couponCode})
        // console.log(foundCoupon);

        if(foundCoupon){
            const valid = foundCoupon.endDate > new Date();
            if(valid){
                res.json({success:true})
            }else{
                res.json({expired:true})
            }

        } else {
            res.json({notFound:true})
        }
    }catch(error){
        console.log(error.message);
    }
}


const searchCoupons = async (req, res) => {
    try {
        const searchTerm = req.query.term || ''; // Default to empty string if term is not provided
        const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search

        const coupons = await couponModel.find({
            $or: [
                { 'couponName': { $regex: regex } },
                { 'couponCode': { $regex: regex } },
                { 'couponDescription': { $regex: regex } },
                // Add more fields if needed
            ]
        });

        res.json(coupons);
    } catch (error) {
        console.error('Error searching coupons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    loadCoupons,
    addCoupons,
    saveEditCoupon,
    editdata,
    validateCoupon,
    searchCoupons
};

