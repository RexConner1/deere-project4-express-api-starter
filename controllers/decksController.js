const express = require("express");
const router = express.Router();

const Deck = require("../models").Deck;
const User = require("../models").User;
const Card = require("../models").Card;
const Stat = require("../models").Stat;

// GET USERS DECKS
router.get("/", async (req, res) => {
  let decks = await Deck.findAll({
    include: [{ model: Card }],
    where: { userId: req.user.id }
  })
  res.json({ decks });
});

// router.get("/cards", async (req, res) => {
//   let cards = await Card.findAll({ include: Stat });
//   res.json({ cards });
// });

// GET USER DECK
router.get("/:id", async (req, res) => {
  let deck = await Deck.findByPk(req.params.id, {
    include: [{ model: Card }],
    where: { userId: req.user.id }
  });
  res.json({ deck });
});

// UPDATE A DECK (NAME)
router.put("/:id", async (req, res) => {
  let updatedDeck = await Deck.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  });
  let deck = await Deck.findByPk(req.params.id, {
    include: Card,
  });
  res.json({ deck });
});

// DELETE A DECK
router.delete("/:id", async (req, res) => {
  await Deck.destroy({
    where: { id: req.params.id },
  });
  res.json({
    message: `Deck with id ${req.params.id} was deleted`,
  });
});

// ADD CARD TO USER'S DECK
router.post("/:id/addcard", async (req, res) => {
  let deck = await Deck.findByPk(req.params.id, {
    include: [{ model: Card }],
    where: { userId: req.user.id }
  });

  let card = await Card.findByPk(req.body.id, {

  })

  deck.addCard(card)

  res.json({ deck })
});

// REMOVE CARD FROM USER'S DECK


module.exports = router;
