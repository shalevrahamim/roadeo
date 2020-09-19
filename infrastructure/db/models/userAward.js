const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user_award', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        award_id: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        user_id: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    }, {
        timestamps: true
    });
};