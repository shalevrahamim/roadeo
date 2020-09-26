'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class module extends Model {
    static associate(models) {
      module.belongsTo(models.course, { foreignKey: 'courseId', as: 'course' });
      module.hasMany(models.subModule, { as: 'subModules' });
    }
  };
  module.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'module',
  });
  return module;
};