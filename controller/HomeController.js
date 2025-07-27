class Controller_Of_HomeController{
    static homePage = async (req, res)=>{
        res.render('home.ejs')
    }

}

module.exports = {
    Controller_Of_HomeController,
}