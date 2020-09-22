'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userAward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userAward.init({
    userId: DataTypes.INTEGER,
    awardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userAward',
  });
  return userAward;
};