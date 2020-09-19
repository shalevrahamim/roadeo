const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email_address: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
    }, {
        timestamps: true
    });
};