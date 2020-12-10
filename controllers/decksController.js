const express = require("express");
const router = express.Router();

const Deck = require("../models").Deck;
const User = require("../models").User;
const Card = require("../models").Card;

// GET USERS DECKS
router.get("/", async (req, res) => {
  // const test = req.user
  // res.json({ test });
  let user = await User.findByPk(req.user.id, {
    include: [{ model: Deck }]
  });
  res.json({ user });
});

module.exports = router;
