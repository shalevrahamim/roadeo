'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contest extends Model {
    static associate(models) {
      contest.hasMany(models.contestSubmission, { as: 'submissions' });
    }
  };
  contest.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    duration: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'contest',
  });
  return contest;
};