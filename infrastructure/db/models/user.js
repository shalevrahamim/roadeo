'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.contestSubmission, { as: 'contestSubmissions' });
      User.hasMany(models.courseSubmission, { as: 'courseSubmissions' });
      User.hasMany(models.logEntry, { as: 'logEntries' });
      User.hasMany(models.userCourse, { as: 'userCourses' });
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