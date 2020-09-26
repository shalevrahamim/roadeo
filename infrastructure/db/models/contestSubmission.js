'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contestSubmission extends Model {
    static associate(models) {
      contestSubmission.belongsTo(models.contest, { foreignKey: 'contestId', as: 'contest' });
      contestSubmission.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  };
  contestSubmission.init({
    contestId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    upVotes: DataTypes.INTEGER,
    url: DataTypes.STRING,
    metadata: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contestSubmission',
  });
  return contestSubmission;
};