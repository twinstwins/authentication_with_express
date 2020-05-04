module.exports = (req, res, next) =>{
  if(req.body.password.length < 8){
    res.render('../views/login',{errors: "パスワードは8文字以上です"})
  }
  next()
}
