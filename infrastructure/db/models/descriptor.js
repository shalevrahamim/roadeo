'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class descriptor extends Model {
    static associate(models) {
      descriptor.belongsTo(models.subModule,  {foreignKey: 'subModuleId', as: 'subModule'});
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