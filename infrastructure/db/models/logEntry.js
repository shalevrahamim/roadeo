'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logEntry extends Model {
    static associate(models) {
      logEntry.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  };
  logEntry.init({
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'logEntry',
  });
  return logEntry;
};