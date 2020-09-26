'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    static associate(models) {
      course.hasMany(models.module, { as: 'modules' });
      course.belongsToMany(models.User, {
        through: 'userCourse',
        as: 'users',
        foreignKey: 'courseId',
        otherKey: 'userId'
      });
      course.belongsToMany(models.subModule, {
        through: 'userCourse',
        as: 'subModules',
        foreignKey: 'courseId',
        otherKey: 'subModuleId'
      });
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