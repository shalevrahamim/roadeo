'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class descriptor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  descriptor.init({
    subModuleId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    state: DataTypes.STRING,
    strategy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'descriptor',
  });
  return descriptor;
};