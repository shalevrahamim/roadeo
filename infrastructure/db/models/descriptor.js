'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Descriptor extends Model {
    static associate(models) {
      Descriptor.belongsTo(models.SubModule, {
        foreignKey: 'subModuleId',
        as: 'subModule',
      });
    }
  }
  Descriptor.init(
    {
      subModuleId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      state: DataTypes.STRING,
      strategy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Descriptor',
    }
  );
  return Descriptor;
};
