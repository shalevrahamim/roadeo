'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LogEntry extends Model {
    static associate(models) {
      LogEntry.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  LogEntry.init(
    {
      userId: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'LogEntry',
    }
  );
  return LogEntry;
};
