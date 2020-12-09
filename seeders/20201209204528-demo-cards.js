'use strict';
const axios = require('axios')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const response = await axios('https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Normal Monster')
    const monsters = response.data.data
    const monsterStats = monsters.map(monster => monster.name)
    console.log(monsterStats)

    // let cards = await queryInterface.bulkInsert("Cards", [
    //   { name: "The Beatles" },
    //   { name: "Rihanna" },
    //   // { name: response.data.data[0].name }
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
