const userModel = require("../models/usermodel")

const userIn =async (req,res,next)=>{
    console.log(req.session.userId,'lalalala');
    if(req.session.userId){
        const userData = await userModel.findOne({_id:req.session?.userId?._id})
        console.log(userData,'userData')
        if(userData &&!userData?.isBlocked ){
            next()
        }else{
            delete req.session.userId
            res.redirect('/login')
        }
    }
    else{
        res.redirect('/login')
    }
    
}

const existUser= (req,res,next)=>{
    console.log('akakak')
    if(req.session.userId){
        res.redirect('/')
    }else{
        next()
    }
}

// const validateUpdateProfile = [
//     body('name').notEmpty().withMessage('Name is required'),
//     body('email').isEmail().withMessage('Valid email is required'),
//     body('mobile').isMobilePhone().withMessage('Valid mobile number is required'),
//     body('newPwd').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//     body('confirmPwd').optional().custom((value, { req }) => value === req.body.newPwd).withMessage('Passwords must match')
//   ];






module.exports={
    userIn,
    existUser,
    // validateUpdateProfile,
}