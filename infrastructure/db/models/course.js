<<<<<<< HEAD
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
=======
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('course', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true
    });
>>>>>>> 2e3ad92539dbaddf1ae17dd0103cb1a9ede9e896
};