'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContestSubmission extends Model {
    static associate(models) {
      ContestSubmission.belongsTo(models.Contest, {
        foreignKey: 'contestId',
        as: 'contest',
      });
      ContestSubmission.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  ContestSubmission.init(
    {
      contestId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      upVotes: DataTypes.INTEGER,
      url: DataTypes.STRING,
      metadata: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ContestSubmission',
    }
  );
  return ContestSubmission;
};
