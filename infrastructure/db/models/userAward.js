'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class userAward extends Model {
    static associate(models) {
      models.User.belongsToMany(models.award, { through: userAward });
      models.award.belongsToMany(models.User, { through: userAward });
    }
  };
  userAward.init({
    userId: DataTypes.INTEGER,
    awardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userAward',
  });
  return userAward;
};