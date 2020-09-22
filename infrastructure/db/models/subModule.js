'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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