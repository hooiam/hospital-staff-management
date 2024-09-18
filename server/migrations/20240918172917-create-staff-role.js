'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('staffRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'staffs',
            fieldName
          },
          key: 'id',
        },
        allowNull: false 
      },
      roleId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'roles'
          },
          key: 'id',
        },
        allowNull: false 
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('staffRoles');
  }
};