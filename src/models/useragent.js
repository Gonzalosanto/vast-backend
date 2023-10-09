'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userAgent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['operatingsystem'])
    }
  }
  userAgent.init({
    ua: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userAgent',
  });
  return userAgent;
};