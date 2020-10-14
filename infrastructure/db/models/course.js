'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.Module, { as: 'modules' });
      Course.belongsToMany(models.User, {
        through: 'userCourse',
        as: 'users',
        foreignKey: 'courseId',
        otherKey: 'userId',
      });
      Course.belongsToMany(models.SubModule, {
        through: 'userCourse',
        as: 'subModules',
        foreignKey: 'courseId',
        otherKey: 'subModuleId',
      });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Course',
    }
  );
  return Course;
};
