module.exports = function(req,res){
  console.log('登録します！')
  return res.render("../views/register",{ csrfToken: req.csrfToken(),errors: ""})
}
