'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class userCourse extends Model {
    static associate(models) {
      userCourse.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      userCourse.belongsTo(models.course, { foreignKey: 'courseId', as: 'course' });
      userCourse.belongsTo(models.subModule, { foreignKey: 'subModuleId', as: 'subModule' });
    }
  };
  userCourse.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    subModuleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userCourse',
  });
  return userCourse;
};