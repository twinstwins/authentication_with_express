const Sequelize = require('sequelize');
const models = require('../models')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

module.exports = (req,res) => {
  // findAll([options]) -> Promise.<Array.<Instance>>
var matched_users = models.User.findAll({
     where:  Sequelize.or({email: req.body.email})
 });

 // 生成された Promise オブジェクトの then 関数を実行することで、
 // 非同期処理の成功時(resolveが実行された時)のメソッドチェーンを作ることができる
 matched_users.then(function(users){
   console.log(users)

   // 同様のemailを所持するユーザーがいないことを確認
     if(users.length == 0){
       console.log(users)

         const passwordHashed = bcrypt.hashSync(req.body.password,3);
         models.User.create({
             name: req.body.name,
             email: req.body.email,
             password: passwordHashed
         }).then(function(){
             let newSession = req.session;
             newSession.email = req.body.email;
             res.render('../views/home',{errors: "ユーザー登録に成功"});

         });
     }
     else{
         res.render('../views/register',{errors: "入力内容に誤りがあります",csrfToken: req.csrfToken()});
     }
 })
};
