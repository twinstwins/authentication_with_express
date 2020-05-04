var models = require('../models')
const User = require('../models/user')
const ResetToken = require('../models/user')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    ignoreTLS: true,
    auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
    }
});

module.exports = async function(req, res, next) {
  //ensure that you have a user with this email
  console.log(req.body.email)
  var email = await models.User.findOne({where: { email: req.body.email }});
  if (email == null) {
  /**
   * we don't want to tell attackers that an
   * email doesn't exist, because that will let
   * them use this form to find ones that do
   * exist.
   **/
    return res.json({status: 'ok'});
  }
  /**
   * Expire any tokens that were previously
   * set for this user. That prevents old tokens
   * from being used.
   **/
  await models.ResetToken.update({
      used: 1
    },
    {
      where: {
        email: req.body.email
      }
  });

  //Create a random reset token
  var token = crypto.randomBytes(64).toString('base64');
  console.log(token)
  //token expires after one hour
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 1/24);

  //insert token data into DB
  await models.ResetToken.create({
    email: req.body.email,
    expiration: expireDate,
    token: token,
    used: 0
  });

  //create email
  const message = {
      from: process.env.SENDER_ADDRESS,
      to: req.body.email,
      replyTo: process.env.REPLYTO_ADDRESS,
      subject: process.env.FORGOT_PASS_SUBJECT_LINE,
      text: 'パスワードリセットのためには以下のリンクをクリックし、再設定を行ってください。\n\nhttp://'+process.env.DOMAIN+'/reset-password?token='+encodeURIComponent(token)+'&email='+req.body.email
  };

  //send email
  transport.sendMail(message, function (err, info) {
     if(err) { console.log(err)}
     else { console.log(info); }
  });
  return res.json({status: 'ok'});
};
