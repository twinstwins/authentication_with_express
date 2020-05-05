module.exports = (req, res) =>{
  if (req.session.email) {
    console.log(req.session.url)
    res.render("../views/post");
  }
  else{
    req.session.url = req.url
    res.redirect('/auth/login')
  }
}
