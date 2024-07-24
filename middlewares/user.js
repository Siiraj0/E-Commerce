const userIn = (req,res,next)=>{
    if(req.session.userId){
        next()
    }else{
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