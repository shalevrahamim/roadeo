'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    static associate(models) {
      course.hasMany(models.module, { as: 'modules' });
      course.hasMany(models.userCourse, { as: 'userCourses' });
    }
  };
  course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};