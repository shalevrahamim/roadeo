const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('contest', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        duration: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    }, {
        timestamps: true
    });
};