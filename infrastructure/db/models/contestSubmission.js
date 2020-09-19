const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('contest_submission', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        contest_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        up_votes: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0
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