'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.ContestSubmission, { as: 'contestSubmissions' });
      User.hasMany(models.CourseSubmission, { as: 'courseSubmissions' });
      User.hasMany(models.LogEntry, { as: 'logEntries' });
      /* User.belongsToMany(models.Award, {
        through: 'UserAward',
        as: 'Awards',
        foreignKey: 'userId',
        otherKey: 'awardId',
      });
      User.belongsToMany(models.Course, {
        through: 'UserCourse',
        as: 'courses',
        foreignKey: 'userId',
        otherKey: 'courseId',
      });
      User.belongsToMany(models.SubModule, {
        through: 'UserCourse',
        as: 'subModules',
        foreignKey: 'userId',
        otherKey: 'subModuleId',
      }); */
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
