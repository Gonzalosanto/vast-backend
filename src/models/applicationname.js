'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class applicationName extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models['applicationstore'], {through: models['storenames']})
      this.belongsToMany(models['applicationstore'], {through: models['storenames']})
    }
  }
  applicationName.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'applicationName',
  });
  return applicationName;
};