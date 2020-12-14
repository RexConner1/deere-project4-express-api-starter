const express = require("express");
const router = express.Router();

const User = require("../models").User;
const Deck = require("../models").Deck;
const DeckCard = require("../models").DeckCard;
const Card = require("../models").Card;
const Stat = require("../models").Stat;

// GET USERS DECKS
router.get("/", async (req, res) => {
  let decks = await Deck.findAll({
    include: [{ 
      model: Card,
      attributes: ["id", "cardNumber", "name"],
      include: [{
        model: Stat,
        attributes: ["level", "attack", "defense"],
      }],
    }],
    where: { userId: req.user.id }
  })
  res.json({ decks });
});

// GET USER DECK
router.get("/deck/:id", async (req, res) => {
  let deck = await Deck.findByPk(req.params.id, {
    include: [{ 
      model: Card,
      attributes: ["id", "cardNumber", "name"],
      include: [{
        model: Stat,
        attributes: ["level", "attack", "defense"],
      }],
    }],
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
    where: { userId: req.user.id }
  });

  let card = await Card.findByPk(req.body.id, {

  })

  deck.addCard(card)

  deck = await Deck.findByPk(req.params.id, {
    include: [{ model: Card }],
    where: { userId: req.user.id }
  });

  res.json({ deck })
});

// REMOVE CARD FROM USER'S DECK
router.delete("/:id/removecard", async (req, res) => {
  // await DeckCard.destroy({
  //   where: { id: req.params.id },
  // });

  let deck = await Deck.findByPk(req.params.id, {
    where: { userId: req.user.id }
  });

  let card = await Card.findByPk(req.body.id)

  await deck.removeCard(card)

  deck = await Deck.findByPk(req.params.id, {
    include: [{ model: Card }],
    where: { userId: req.user.id }
  });

  res.json({
    // message: `Card with id ${req.params.id} was deleted`,
    deck
  });
});


module.exports = router;
