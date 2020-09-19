const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('sub_module', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        module_id: {
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
};