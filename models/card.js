'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Card.belongsToMany(models.Deck, {
        through: "DeckCard",
        foreignKey: "cardId",
        otherKey: "deckId",
      });
      Card.hasOne(models.Image, { foreignKey: "cardId" });
      Card.hasOne(models.Stat, { foreignKey: "cardId" })
      Card.hasMany(models.Event, {foreignKey: "cardId" })
      Card.belongsTo(models.Type, { foreignKey: "typeId" });
    }
  };
  Card.init({
    cardNumber: DataTypes.INTEGER,
    name: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};