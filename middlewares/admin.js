const logout = async (req,res,next)=>{
    try {
        if( req.session.admin){
            res.redirect('/admin/index')
        }else{
            next()
            }
            
    } catch (error) {
        console.log(error.message)
        
    }
}

const login = async (req,res,next)=>{
    try {
        if(!req.session.admin){
            res.redirect('/admin/login')
        }else{
            next()
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports={
    logout,
    login
}