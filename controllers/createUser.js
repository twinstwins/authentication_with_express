const Sequelize = require('sequelize');
const models = require('../models')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

module.exports = (req,res) => {
  console.log("！！！！！！！！！！！！！！POSTメソッド送信！！！！！！！！！！！！！！！！！！！！")
  // findAll([options]) -> Promise.<Array.<Instance>>
var matched_users = models.User.findAll({
     where:  ({email: req.body.email})
 });
 // 生成された Promise オブジェクトの then 関数を実行することで、
 // 非同期処理の成功時(resolveが実行された時)のメソッドチェーンを作ることができる
 matched_users.then(function(users){
   // 同様のemailを所持するユーザーがいないことを確認
     if(users.length == 0){
         const passwordHashed = bcrypt.hashSync(req.body.password,3);
         models.User.create({
             name: req.body.name,
             email: req.body.email,
             password: passwordHashed
         }).then(function(){
             let newSession = req.session;
             newSession.email = req.body.email;
             res.redirect('/');
         });
     }
     else{
         res.render('../views/register',{errors: "入力内容に誤りがあります",csrfToken: req.csrfToken()});
     }
 })
};
