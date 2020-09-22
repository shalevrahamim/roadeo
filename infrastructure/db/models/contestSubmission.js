'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contestSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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