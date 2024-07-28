const User = require('../../models/usermodel')
const admin = require('../../models/adminmodel')
const order = require('../../models/ordermodel')
const offer = require('../../models/offermodel')
const product = require('../../models/productmodel')
const category = require('../../models/categorymodel')



const loadLogin = async (req, res) => {
    try {
        res.render('admin/login')
    } catch (error) {
        console.log(error.message);
    }
}



const loadOffers=async (req,res)=>{
    try {
        const offers = await offer.find()

        res.render('admin/offers',{offers})
    } catch (error) {
        console.log(error.message);
    }
}


const loadAddOffer = async(req, res) =>{
    try{
        const categories = await category.find({})
        const products = await product.find({})

        res.render('admin/addOffer',{categories,products})
    }catch(error){
        console.log(error.message);
    }
}

const addOffer = async(req,res) =>{
    try{
        const {title, percentage, startDate, endDate, category, productt} = req.body.offerDetails

        const existingOffer = await offer.findOne({name : { $regex: new RegExp('^' + title + '$', 'i') } })

        if(existingOffer){
            return res.json({alreadyExist:true})
        }

        const newOfferData = {
            name : title,
            percentage : percentage,
            startDate : startDate,
            endDate : endDate
        }

        if(category){
            newOfferData.category = category;
        }

        if(productt){
            newOfferData.product = productt;
        }

        const newOffer = await offer.create(newOfferData)

        if(category){
            const products = await product.find({category})

            products.forEach(async(prod)=>{
                const offeredPrice = (prod.price * (percentage / 100));
                const offerPrice = prod.price - offeredPrice
                const applied = await product.updateOne({_id:prod._id}, {$set: {offer : newOffer._id, offerPrice : parseFloat(offerPrice.toFixed(2)) } })
                console.log(applied);
            })

        } else if(product){
            const prod = await product.findOne({_id:productt});

            const offeredPrice = (prod.price * (percentage / 100));
            const offerPrice = prod.price - offeredPrice;
            const applied = await product.updateOne({_id:prod._id}, {$set: {offer : newOffer._id, offerPrice : parseFloat(offerPrice.toFixed(2)) } })
            console.log(applied);
        }

        console.log('new offer added')
        res.json({success:true})

    }catch(error){
        console.log(error.message);
    }
}


const loadEditOffer = async(req, res) =>{
    try{
        const offerId = req.params.id
        const offerDetails = await offer.findOne({_id:offerId}).populate('category product')

        let categories = []
        let products = []

        if(offerDetails.category){
            categories = await category.find({});
        } else if (offerDetails.product){
            products = await product.find({});
        }

        res.render('admin/editOffer',{offerDetails, categories, products})
    }catch(error){
        console.log(error.message);
    }
}

const editOffer = async(req,res) =>{
    try{
        const {offerId, title, percentage, startDate, endDate, category, productt} = req.body.offerDetails
        console.log(req.body.offerDetails)
        const existingOffer = await offer.findOne({_id:offerId})
        console.log(existingOffer)
        let previousProducts = [];
        if(existingOffer.category){
            previousProducts = await product.find({category : existingOffer.category})
            console.log(previousProducts);
        } else if (existingOffer.product){
            previousProducts = await product.find({_id:existingOffer.product})
        }

        existingOffer.name = title;
        existingOffer.percentage = percentage;
        existingOffer.startDate = startDate;
        existingOffer.endDate = endDate;

        let updatedProducts = [];
        if(category){
            existingOffer.category = category;
            existingOffer.product = null;

            updatedProducts = await product.find({category})

            for(const prod of updatedProducts){
                const offerPrice = prod.price - (prod.price * (percentage / 100));
                await product.updateOne({ _id: prod._id }, {
                    offer: existingOffer._id,
                    offerPrice: parseFloat(offerPrice.toFixed(2))
                });
            }

        } else if(productt){
            existingOffer.product = productt
            existingOffer.category = null;

            const prod = await product.findOne({_id:productt})
            if (prod) {
                updatedProducts = [prod];
                const offerPrice = prod.price - (prod.price * (percentage / 100));
                await product.updateOne({ _id: prod._id }, {
                    offer: existingOffer._id,
                    offerPrice: parseFloat(offerPrice.toFixed(2))
                });
            }
        }

        const updatedProductIds = updatedProducts.map(prod => prod._id.toString());
        for (const prevProd of previousProducts) {
            if (!updatedProductIds.includes(prevProd._id.toString())) {
                await product.updateOne({ _id: prevProd._id }, {
                    $set: { offerPrice: prevProd.price },
                    $unset:{ offer: ""}
                });
            }
        }

        await existingOffer.save();
        
        res.json({success:true}) 

    }catch(error){
        console.log(error.message);
    }
}


const offerDelete = async(req, res) =>{
    try{
        const {offerId} = req.body

        const offerr = await offer.findOne({_id:offerId}).populate('category product')

        if (offerr.category) {
            const category = offerr.category;
            const products = await product.find({ category });

            for (const prod of products) {
                await product.findOneAndUpdate({ _id: prod._id }, {
                    $set: { offerPrice: prod.price },
                    $unset: { offer: "" }
                });
            }
        } else if (offerr.product) {
            const productt = offerr.product;
            await product.findOneAndUpdate({ _id: productt._id }, {
                $set: { offerPrice: productt.price },
                $unset: { offer: "" }
            });
        }

        const done = await offer.findOneAndDelete({_id:offerId})

        if(done){
            res.json({success:true})
        }
    }catch(error){
        console.log();
    }
}


module.exports ={
    loadOffers ,
    addOffer,
    loadAddOffer,  
    offerDelete,
    editOffer,
    loadEditOffer,

}