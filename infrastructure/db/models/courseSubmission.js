'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courseSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  courseSubmission.init({
    userId: DataTypes.INTEGER,
    subModuleId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    metadata: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'courseSubmission',
  });
  return courseSubmission;
};