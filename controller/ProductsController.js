class Controller_Of_ProductsContoller{
    static ProductsPage = (req, res)=>{
        res.render('products.ejs')
    }
}

module.exports = {
    Controller_Of_ProductsContoller,
}