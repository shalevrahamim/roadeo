'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate(models) {
      Module.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
      Module.hasMany(models.SubModule, { as: 'subModules' });
    }
  }
  Module.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Module',
    }
  );
  return Module;
};
