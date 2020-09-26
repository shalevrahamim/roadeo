'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class award extends Model {
    static associate(models) {
      award.belongsToMany(models.User, {
        through: 'userAward',
        as: 'users',
        foreignKey: 'awardId',
        otherKey: 'userId'
      });
    }
  };
  award.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'award',
  });
  return award;
}