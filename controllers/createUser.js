const Sequelize = require('sequelize');
const models = require('../models')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

// User.findAll　が動かねえええ！

module.exports = (req,res) => {
  console.log("！！！！！！！！！！！！！！POSTメソッド送信！！！！！！！！！！！！！！！！！！！！")
  var matched_users = models.User.findAll({
     where:  ({email: req.body.email})
 });
 matched_users.then(function(users){
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
