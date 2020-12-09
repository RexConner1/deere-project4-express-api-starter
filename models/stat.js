'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stat.belongsTo(models.Card, { foreignKey: "cardId" })
    }
  };
  Stat.init({
    level: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    attribute: DataTypes.STRING,
    cardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stat',
  });
  return Stat;
};