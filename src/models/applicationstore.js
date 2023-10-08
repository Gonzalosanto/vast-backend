'use strict';
import { operatingSystem } from './operatingsystem'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class applicationStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      operatingSystem.hasMany(applicationStore)
      this.belongsTo(models.operatingSystem)
    }
  }
  applicationStore.init({
    store: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'applicationStore',
  });
  return applicationStore;
};