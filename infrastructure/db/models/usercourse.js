'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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