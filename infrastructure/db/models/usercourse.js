'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class userCourse extends Model {
    static associate(models) {
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