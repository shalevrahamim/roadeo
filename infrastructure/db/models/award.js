'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Award extends Model {
    static associate(models) {
      Award.belongsToMany(models.User, {
        through: 'UserAward',
        as: 'users',
        foreignKey: 'awardId',
        otherKey: 'userId',
      });
    }
  }
  Award.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Award',
    }
  );
  return Award;
};
