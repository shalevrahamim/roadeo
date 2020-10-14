'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubModule extends Model {
    static associate(models) {
      SubModule.hasMany(models.CourseSubmission, { as: 'submissions' });
      SubModule.hasMany(models.Descriptor, { as: 'descriptors' });
      SubModule.belongsTo(models.Module, {
        foreignKey: 'moduleId',
        as: 'module',
      });
      SubModule.belongsToMany(models.User, {
        through: 'userCourse',
        as: 'users',
        foreignKey: 'subModuleId',
        otherKey: 'userId',
      });
      SubModule.belongsToMany(models.Course, {
        through: 'userCourse',
        as: 'courses',
        foreignKey: 'subModuleId',
        otherKey: 'courseId',
      });
    }
  }
  SubModule.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      moduleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SubModule',
    }
  );
  return SubModule;
};
