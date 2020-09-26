'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subModule extends Model {
    static associate(models) {
      subModule.hasMany(models.courseSubmission, { as: 'submissions' });
      subModule.hasMany(models.descriptor, { as: 'descriptors' });
      subModule.belongsTo(models.module, { foreignKey: 'moduleId', as: 'module' });
      subModule.belongsToMany(models.User, {
        through: 'userCourse',
        as: 'users',
        foreignKey: 'subModuleId',
        otherKey: 'userId'
      });
      subModule.belongsToMany(models.course, {
        through: 'userCourse',
        as: 'courses',
        foreignKey: 'subModuleId',
        otherKey: 'courseId'
      });
    }
  };
  subModule.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    moduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subModule',
  });
  return subModule;
};