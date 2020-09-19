const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user_course', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        course_id: {
            type: DataTypes.INTEGER
        },
        sub_module_id: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: true
    });
};