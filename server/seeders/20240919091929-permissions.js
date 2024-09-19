'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('permissions', [
      {
        name: 'create',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'list',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'update',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'delete',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('permissions', null, {});
  }
};
