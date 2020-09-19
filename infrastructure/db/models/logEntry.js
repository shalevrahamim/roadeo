const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('log_entry', {
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
        description: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true
    });
};