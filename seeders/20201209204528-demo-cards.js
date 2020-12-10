'use strict';
const axios = require('axios')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const response = await axios('https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Normal Monster')

    const monsters = response.data.data
    const monsterStats = monsters.map(monster => monster.name)
    // console.log(monsters[0])
    // console.log(monsterStats)

    let cards = await queryInterface.bulkInsert("Cards", [
      { cardNumber: monsters[0].id, name: monsters[0].name, type: monsters[0].type },
      { cardNumber: monsters[1].id, name: monsters[1].name, type: monsters[1].type },
      { cardNumber: monsters[2].id, name: monsters[2].name, type: monsters[2].type },
      { cardNumber: monsters[3].id, name: monsters[3].name, type: monsters[3].type },
      { cardNumber: monsters[4].id, name: monsters[4].name, type: monsters[4].type },
    ]);

    let events = await queryInterface.bulkInsert("Events", [
      { description: monsters[0].desc, cardId: 1 },
      { description: monsters[1].desc, cardId: 2 },
      { description: monsters[2].desc, cardId: 3 },
      { description: monsters[3].desc, cardId: 4 },
      { description: monsters[4].desc, cardId: 5 },
    ]);

    let images = await queryInterface.bulkInsert("Images", [
      { small: monsters[0].card_images[0].image_url_small, large: monsters[0].card_images[0].image_url, cardId: 1 },
      { small: monsters[1].card_images[0].image_url_small, large: monsters[1].card_images[0].image_url, cardId: 2 },
      { small: monsters[2].card_images[0].image_url_small, large: monsters[2].card_images[0].image_url, cardId: 3 },
      { small: monsters[3].card_images[0].image_url_small, large: monsters[3].card_images[0].image_url, cardId: 4 },
      { small: monsters[4].card_images[0].image_url_small, large: monsters[4].card_images[0].image_url, cardId: 5 },
    ]);

    let stats = await queryInterface.bulkInsert("Stats", [
      { level: monsters[0].level, attack: monsters[0].atk, defense: monsters[0].def, attribute: monsters[0].attribute, cardId: 1 },
      { level: monsters[1].level, attack: monsters[1].atk, defense: monsters[1].def, attribute: monsters[1].attribute, cardId: 2 },
      { level: monsters[2].level, attack: monsters[2].atk, defense: monsters[2].def, attribute: monsters[2].attribute, cardId: 3 },
      { level: monsters[3].level, attack: monsters[3].atk, defense: monsters[3].def, attribute: monsters[3].attribute, cardId: 4 },
      { level: monsters[4].level, attack: monsters[4].atk, defense: monsters[4].def, attribute: monsters[4].attribute, cardId: 5 },
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
