const express = require("express");
const router = express.Router();

const Deck = require("../models").Deck;
const User = require("../models").User;
const Card = require("../models").Card;
const Stat = require("../models").Stat;

// GET ALL CARDS
router.get("/", async (req, res) => {
    let allCards = await Card.findAll({ include: Stat });
    res.json({ allCards });
});

module.exports = router;
