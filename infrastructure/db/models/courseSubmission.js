'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseSubmission extends Model {
    static associate(models) {
      CourseSubmission.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      CourseSubmission.belongsTo(models.SubModule, {
        foreignKey: 'subModuleId',
        as: 'subModule',
      });
    }
  }
  CourseSubmission.init(
    {
      userId: DataTypes.INTEGER,
      subModuleId: DataTypes.INTEGER,
      url: DataTypes.STRING,
      metadata: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CourseSubmission',
    }
  );
  return CourseSubmission;
};
