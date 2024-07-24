const couponModel= require('../../models/coupon')

const loadCoupons=(req,res)=>{
    try {
        res.render('admin/coupons')
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
        const { couponname, couponDescription, percentage, endDate, minAmount } = req.body;

        // Log the received body
        console.log('Request body:', req.body);

        if (!couponname || !couponDescription || !percentage || !endDate || !minAmount) {
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

        // Ensure endDate is a valid date
        const endDateObj = new Date(endDate);
        if (isNaN(endDateObj.getTime())) {
            console.log('Validation error: Invalid end date');
            return res.status(400).send("Invalid end date");
        }

        const couponCode = generateRandomString();
        console.log('Generated coupon code:', couponCode);

        const addedCoupon = await couponModel.create({
            couponName: couponname,
            couponCode: couponCode,
            couponDescription: couponDescription,
            percentage: percentageNum,
            minAmount: minAmountNum,
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



module.exports={
    loadCoupons,
    addCoupons,
}