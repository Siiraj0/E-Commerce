

const loadOffers= (req,res)=>{
    try {
        res.render('admin/offers')
    } catch (error) {
        console.log(error.message);
    }
}

module.exports ={
    loadOffers   
}