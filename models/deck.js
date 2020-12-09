'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Deck.belongsTo(models.User, { foreignKey: "userId" });
      Deck.belongsToMany(models.Card, {
        through: "DeckCard",
        foreignKey: "deckId",
        otherKey: "cardId",
      });
    }
  };
  Deck.init({ 
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Deck',
  });
  return Deck;
};