var models = require('../models')
const User = require('../models/user')
const ResetToken = require('../models/user')
const crypto = require('crypto');
require('dotenv').config()
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
    }
});

module.exports = async function(req, res, next) {

  //　受け取ったパラメータ(メールアドレス)と一致するユーザーがいるかどうかの確認
  // もし空の場合でも、その情報を伝えることはしない
  // 相手に伝えるとセキュリティ上の問題が発生する
  console.log(req.body.email)
  var email = await models.User.findOne({where: { email: req.body.email }});
  if (email == null) {
    return res.json({status: 'ok'});
  }

   // 過去に当該メールアドレスにセットされたトークンを再使用されないための操作
   // usedの値は2つの値を取り、booleanのように扱う
   // 0の場合は使用可能、1は使用不可を意味
  await models.ResetToken.update({
      used: 1
    },
    {
      where: {
        email: req.body.email
      }
  });

// 認証用トークンの作成
  var token = crypto.randomBytes(64).toString('base64');

// 期限切れを現在時刻から1時間後にセット
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 1/24);

  // メールアドレスと結びつけてトークンをセット
  await models.ResetToken.create({
    email: req.body.email,
    expiration: expireDate,
    token: token,
    used: 0
  });

  // メールの作成
  // SMTPサーバーには Mailgun を使用
  const message = {
      from: process.env.SENDER_ADDRESS,
      to: req.body.email,
      replyTo: process.env.REPLYTO_ADDRESS,
      subject: process.env.FORGOT_PASS_SUBJECT_LINE,
      // リセット用URLに、クエリパラメータを付加し、リセットの画面で使用する
      text: 'パスワードリセットのためには以下のリンクをクリックし、再設定を行ってください。\n\nhttp://'+process.env.DOMAIN+'/reset-password?token='+encodeURIComponent(token)+'&email='+req.body.email
  };

// メールの送信と、その内容をコンソールに出力
  console.log(message)
  transport.sendMail(message, function (err, info) {
     if(err) { console.log(err)}
     else { console.log(info); }
  });
  return res.json({status: 'ok'});
};
