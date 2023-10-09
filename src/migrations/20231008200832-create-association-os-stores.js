'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('applicationstores', 'OperatingSystemId',
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
    await queryInterface.addColumn('userAgents', 'OperatingSystemId',
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
