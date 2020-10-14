'use strict';
const { Model } = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class UserAward extends Model {
    static associate(models) {}
  }
  UserAward.init(
    {
      userId: DataTypes.INTEGER,
      awardId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserAward',
    }
  );
  return UserAward;
};
