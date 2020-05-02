module.exports = ('auth/login',function(req,res){
  console.log("ログインします！")
  console.log(req.body._csrf)
    res.render('../views/login');
});
