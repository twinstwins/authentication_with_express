const Sequelize = require('sequelize');
// OpはSequelizeのクラスメソッド
const Op = Sequelize.Op;
var models = require('../models')
const User = require('../models/user')
const ResetToken = require('../models/user')


module.exports = async function(req, res, next) {
// 期限切れトークンを全て削除
  await models.ResetToken.destroy({
    where: {
      // Number comparisons [Op.lt]: 6, // < 6
      // In MySQL the CURDATE() returns the current date in 'YYYY-MM-DD' format
      expiration: { [Op.lt]: Sequelize.fn('CURDATE')},
    }
  });

  //トークン取り出し
  var record = await models.ResetToken.findOne({
    where: {
      // reqにセットされたクエリパラメータの取り出し
      // (パラメータのセットは、forgotpassword.jsを参照)
      email: req.query.email,
      expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
      token: req.query.token,
      used: 0
    }
  });

// 合致するトークンがなければやり直し
  if (record == null) {
    return res.render('../views/resetpassword', {
      message: 'Token has expired. Please try password reset again.',
    });
  }

// ここから送信するrecordの情報をパスワードリセット情報送信画面で、
// hidden_valueとして格納・送信し、一致しなければ失敗とする
  res.render('../views/resetpassword', {
    record: record
  });
};
