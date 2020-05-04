const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models')
const User = require('../models/user')
const ResetToken = require('../models/user')


module.exports = async function(req, res, next) {
  /**
   * This code clears all expired tokens. You
   * should move this to a cronjob if you have a
   * big site. We just include this in here as a
   * demonstration.
   **/
  await models.ResetToken.destroy({
    where: {
      expiration: { [Op.lt]: Sequelize.fn('CURDATE')},
    }
  });

  //find the token
  var record = await models.ResetToken.findOne({
    where: {
      email: req.query.email,
      expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
      token: req.query.token,
      used: 0
    }
  });

  if (record == null) {
    return res.render('../views/resetpassword', {
      message: 'Token has expired. Please try password reset again.',
      showForm: false
    });
  }

  res.render('../views/resetpassword', {
    showForm: true,
    record: record
  });
};
