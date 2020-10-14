'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    static associate(models) {
      Contest.hasMany(models.ContestSubmission, { as: 'submissions' });
    }
  }
  Contest.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      duration: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Contest',
    }
  );
  return Contest;
};
