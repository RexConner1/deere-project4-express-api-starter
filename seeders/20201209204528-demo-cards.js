'use strict';
const axios = require('axios')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const response = await axios('https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Normal Monster')

    const monsters = response.data.data
    const monsterStats = monsters.map(monster => monster.name)
    // console.log(monsters[0])

    let cards = await queryInterface.bulkInsert("Cards", [
      { cardNumber: monsters[0].id, name: monsters[0].name, type: monsters[0].type },
    ]);

    let events = await queryInterface.bulkInsert("Events", [
      { description: monsters[0].desc, cardId: 0 },
    ]);

    let images = await queryInterface.bulkInsert("Images", [
      { small: monsters[0].card_images.image_url_small, large: monsters[0].card_images.image_url, cardId: 0 },
    ]);

    let stats = await queryInterface.bulkInsert("Stats", [
      { level: monsters[0].level, attack: monsters[0].atk, defense: monsters[0].def, attribute: monsters[0].attribute, cardId: 0 },
    ]);

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
  }
};
