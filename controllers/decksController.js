const express = require("express");
const router = express.Router();

const Deck = require("../models").Deck;
const User = require("../models").User;
const Card = require("../models").Card;
const Stat = require("../models").Stat;

// GET USERS DECKS
router.get("/", async (req, res) => {
  // const test = req.user
  // res.json({ test });
  let user = await User.findByPk(req.user.id, {
    include: [{ model: Deck }]
  });

  let decks = await Deck.findAll({
    include: [{ model: Card }],
    where: { userId: req.user.id }
  })
  res.json({ decks });
});

// GET USER DECK
router.get("/:id", async (req, res) => {
  let deck = await Deck.findByPk(req.params.id, {
    include: [{ model: Card }],
    where: { userId: req.user.id }
  });
  res.json({ deck });
});

// router.get("/cards", async (req, res) => {
//   let cards = await Card.findAll({ include: Stat });
//   res.json({ cards });
// });

// ADD CARD TO USER'S DECK
router.post("/:id/addcard", async (req, res) => {
  let deck = await Deck.findByPk(req.params.id, {
    include: [{ model: Card }],
    where: { userId: req.user.id }
  });

  let card = await Card.findByPk()

  user.addCard()
  res.json({ user, card })
});

// REMOVE CARD FROM USER'S DECK


module.exports = router;
