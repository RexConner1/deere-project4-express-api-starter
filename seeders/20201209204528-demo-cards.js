'use strict';
const axios = require('axios')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const response = await axios('https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Normal Monster');

    const monsters = response.data.data;

    const monsterCards = [];
    const monsterEvents = [];
    const monsterImages = [];
    const monsterStats = [];

    monsters.forEach((monster, i) => {
      monsterCards.push({ cardNumber: monster.id, name: monster.name, type: monster.type })
      monsterEvents.push({ description: monster.desc, cardId: i + 1 })
      monsterImages.push({ small: monster.card_images[0].image_url_small, large: monster.card_images[0].image_url, cardId: i + 1 })
      monsterStats.push({ level: monster.level, attack: monster.atk, defense: monster.def, attribute: monster.attribute, cardId: i + 1 })
    });

    let cards = await queryInterface.bulkInsert("Cards", monsterCards);

    let events = await queryInterface.bulkInsert("Events", monsterEvents);

    let images = await queryInterface.bulkInsert("Images", monsterImages);

    let stats = await queryInterface.bulkInsert("Stats", monsterStats);

    // let types = await queryInterface.bulkInsert("Types", [
    //   { type: "normal monster" },
    //   { type: "spell card" },
    //   { type: "trap card" }
    // ]);
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Stats", null, {});
    await queryInterface.bulkDelete("Images", null, {});
    await queryInterface.bulkDelete("Events", null, {});
    await queryInterface.bulkDelete("Cards", null, {});
  }
};
