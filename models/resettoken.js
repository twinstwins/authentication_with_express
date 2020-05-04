'use strict';
module.exports = (sequelize, DataTypes) => {
  const ResetToken = sequelize.define('ResetToken', {
    email: DataTypes.STRING,
    token: DataTypes.STRING,
    expiration: DataTypes.DATE,
    used: DataTypes.INTEGER
  }, {});
  ResetToken.associate = function(models) {
    // associations can be defined here
  };
  return ResetToken;
};