const Sequelize = require('sequelize');
const models = require('../models')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

module.exports = (req,res) => {
    var matched_users = models.User.findAll({
        where: Sequelize.and(
            {email: req.body.email},
        )
    });
    matched_users.then(function(users){
        if(users.length > 0){
            let user = users[0];
            let passwordHashed = user.password;
            if(bcrypt.compareSync(req.body.password,passwordHashed)){
                req.session.userId = user.id
                req.session.email = req.body.email;
                console.log("ログインに成功")
                console.log(req.session.url)
                if (req.session.url == undefined) {
                  return res.redirect('/login-success');
                }
                res.redirect(req.session.url);
            }
            else{
                console.log("ユーザー登録にリダイレクト")
                res.render('../views/login',{errors: "パスワードが違います"});
            }
        }
        else{
        　  console.log("ログインにリダイレクト")
            res.render('../views/login',{errors: "入力に誤りがあります"});
        }
    });
};
