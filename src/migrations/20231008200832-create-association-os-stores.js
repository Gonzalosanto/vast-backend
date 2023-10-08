'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('applicationstores', 'OperatingSystemId',
    {
      type: Sequelize.DataTypes.INTEGER,
        references: {
            model: {
              tableName:'operatingsystems',
            },
            key: 'id',
        },
        allowNull: true
      }
    )
  },

  async down (queryInterface, Sequelize) {
  }
};
