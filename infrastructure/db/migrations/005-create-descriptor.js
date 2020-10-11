'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('descriptors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subModuleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subModules',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      type: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      strategy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('descriptors');
  }
};