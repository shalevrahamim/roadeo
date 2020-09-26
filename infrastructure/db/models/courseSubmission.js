'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courseSubmission extends Model {
    static associate(models) {
      courseSubmission.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      courseSubmission.belongsTo(models.subModule, { foreignKey: 'subModuleId', as: 'subModule' });
    }
  };
  courseSubmission.init({
    userId: DataTypes.INTEGER,
    subModuleId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    metadata: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'courseSubmission',
  });
  return courseSubmission;
};