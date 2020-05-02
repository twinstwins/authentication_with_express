module.exports = ('auth/login',function(req,res){
  console.log("ログインします！")
  console.log(req.csrfToken())
    res.render('../views/login', { csrfToken: req.csrfToken() });
});
