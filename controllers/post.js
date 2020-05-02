module.exports = (req, res) =>{
  if (req.session.userId) {
    console.log(req.session.url)
    res.render("../views/post");
  }
  else{
    req.session.url = req.url
    res.redirect('/auth/login')
  }
}
