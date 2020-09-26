'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class userAward extends Model {
    static associate(models) {
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