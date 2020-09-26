'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.contestSubmission, { as: 'contestSubmissions' });
      User.hasMany(models.courseSubmission, { as: 'courseSubmissions' });
      User.hasMany(models.logEntry, { as: 'logEntries' });
      User.belongsToMany(models.award, {
        through: 'userAward',
        as: 'awards',
        foreignKey: 'userId',
        otherKey: 'awardId'
      });
      User.belongsToMany(models.course, {
        through: 'userCourse',
        as: 'courses',
        foreignKey: 'userId',
        otherKey: 'courseId'
      });
      User.belongsToMany(models.subModule, {
        through: 'userCourse',
        as: 'subModules',
        foreignKey: 'userId',
        otherKey: 'subModuleId'
      });
    }
  };
  User.init({
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};