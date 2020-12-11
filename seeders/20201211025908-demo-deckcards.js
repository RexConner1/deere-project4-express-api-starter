'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let deckCards = await queryInterface.bulkInsert("DeckCards", [
      { deckId: 1, cardId: 1 },
      { deckId: 2, cardId: 1 },
      { deckId: 3, cardId: 1 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('DeckCards', null, {});
  }
};
