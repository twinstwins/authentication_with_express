const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models')
const User = require('../models/user')
const ResetToken = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = async function(req, res, next) {
  //compare passwords
  if (req.body.password1 !== req.body.password2) {
    return res.json({status: 'error', message: 'Passwords do not match. Please try again.'});
  }

  /**
  * Ensure password is valid (isValidPassword
  * function checks if password is >= 8 chars, alphanumeric,
  * has special chars, etc)
  **/
  var record = await models.ResetToken.findOne({
    where: {
      email: req.body.email,
      expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
      token: req.body.token,
      used: 0
    }
  });

  if (record == null) {
    return res.json({status: 'error', message: 'Token not found. Please try the reset password process again.'});
  }

  var upd = await models.ResetToken.update({
      used: 1
    },
    {
      where: {
        email: req.body.email
      }
  });


  var newPassword= bcrypt.hashSync(req.body.password1,3)

  await models.User.update({
    password: newPassword,
  },
  {
    where: {
      email: req.body.email
    }
  });

  return res.json({status: 'ok', message: 'Password reset. Please login with your new password.'});
};
