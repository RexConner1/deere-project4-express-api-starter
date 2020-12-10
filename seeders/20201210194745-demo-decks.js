'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let decks = await queryInterface.bulkInsert("Decks", [
      { name: "Deck1", userId: 1 },
      { name: "Deck2", userId: 1 },
      { name: "Deck3", userId: 1 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Decks', null, {});
  }
};
