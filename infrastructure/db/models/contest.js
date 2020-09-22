'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  contest.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    duration: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'contest',
  });
  return contest;
};