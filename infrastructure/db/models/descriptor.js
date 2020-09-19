const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('descriptor', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        sub_module_id: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING
        },
        strategy: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true
    });
};