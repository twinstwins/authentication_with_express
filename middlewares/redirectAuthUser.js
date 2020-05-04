module.exports = (req, res, next) =>{
  if(req.session.userId){
    console.log("既にログインしています")
  return res.render("../views/home",{errors: "既にログインしています"})
  }
  next()
}
  // if user logged in, redirect to home page } next() }
