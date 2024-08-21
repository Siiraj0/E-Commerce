const cartModel = require('../models/cartmodel')
const productModel = require('../models/productmodel')

const validate = async (userId)=>{
    try {
        const cart = await cartModel.findOne({userId});
        
        if(cart && cart.products.length!==0){

            
            for(const key of cart.products){
    
                
               const product= await productModel.findOne({_id:key.productId});
               if(!product || product.isBlocked){
    
                
                await cartModel.findOneAndUpdate({userId},{ $pull: { products: { productId: key.productId } } })
               }
            }
        }
    } catch (error) {
        console.log(error.messege);
        
    }
}

module.exports=validate