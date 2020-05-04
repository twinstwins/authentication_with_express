module.exports = ('auth/login',function(req,res){
  console.log("ログインします！")
    res.render('../views/login',{errors: ""});
});
