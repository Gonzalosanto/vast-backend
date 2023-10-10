'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('storenames', {
      fields: ['applicationNameId'],
      type: 'foreign key',
      name: 'fk_name_storename',
      references: {
        table: 'applicationnames',
        field: 'id',
      },
      onDelete:'set null',
      onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('storenames', {
      fields: ['applicationStoreId'],
      type: 'foreign key',
      name: 'fk_store_storename',
      references: {
        table: 'applicationstores',
        field: 'id',
      },
      onDelete:'set null',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('storenames', 'fk_store_storename');
    await queryInterface.removeConstraint('storenames', 'fk_name_storename');
  }
};
