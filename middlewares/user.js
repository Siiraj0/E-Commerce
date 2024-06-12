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







module.exports={
    userIn,
    existUser
}