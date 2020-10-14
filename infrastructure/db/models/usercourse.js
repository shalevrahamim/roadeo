'use strict';
const { Model } = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    static associate(models) {}
  }
  UserCourse.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      subModuleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserCourse',
    }
  );
  return UserCourse;
};
