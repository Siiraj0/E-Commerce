
const indexPage = (req, res) => {
    try {
      res.render("admin/index");
    } catch (error) {
      console.log(error.messege);
    }
  };

module.exports={
    indexPage
}