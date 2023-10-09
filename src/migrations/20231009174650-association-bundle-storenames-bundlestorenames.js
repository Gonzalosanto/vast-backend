'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('bundlestorenames',{
      fields:['applicationBundleId'],
      type:'foreign key',
      onDelete: 'set null',
      onUpdate: 'cascade',
      name:'fk_bundle_bndstrname',
      references:{
        table:'applicationbundles',
        field:'id',
      },
    })
    await queryInterface.addConstraint('bundlestorenames',{
      fields:['storeNameId'],
      type:'foreign key',
      onDelete: 'set null',
      onUpdate: 'cascade',
      name:'fk_storename_bndstrname',
      references:{
        table:'storenames',
        field:'id',
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('bundlestorenames', 'fk_storename_bndstrname');
    await queryInterface.removeConstraint('bundlestorenames', 'fk_bundle_bndstrname');
  }
};
