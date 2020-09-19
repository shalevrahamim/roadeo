const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('award', {
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
        type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true
    });
};