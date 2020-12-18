'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let deckCards = await queryInterface.bulkInsert("DeckCards", [
      { deckId: 1, cardId: 1 },
      { deckId: 1, cardId: 2 },
      { deckId: 1, cardId: 3 },
      // { deckId: 2, cardId: 4 },
      // { deckId: 2, cardId: 5 },
      // { deckId: 2, cardId: 6 },
      // { deckId: 3, cardId: 7 },
      // { deckId: 3, cardId: 8 },
      // { deckId: 3, cardId: 9 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('DeckCards', null, {});
  }
};
