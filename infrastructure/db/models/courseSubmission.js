const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('course_submission', {
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
        sub_module_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        url: {
            allowNull: false,
            type: DataTypes.STRING
        },
        metadata: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true
    });
};