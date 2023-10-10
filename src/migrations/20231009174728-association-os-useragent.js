'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('userAgents', {
      type: 'foreign key',
      fields: ['operatingSystemId'],
      name: 'fk_os_ua',
      references: {
        table: 'operatingsystems',
        field: 'id'
      },
      onDelete: 'set null',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
