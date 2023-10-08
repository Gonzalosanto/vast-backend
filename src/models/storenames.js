'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class storenames extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  storenames.init({
    applicationNameId: DataTypes.INTEGER,
    applicationStoreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'storenames',
  });
  return storenames;
};