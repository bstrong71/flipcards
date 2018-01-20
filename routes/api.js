const express       = require("express");
const models        = require("../models/index");
const passport      = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const router        = express.Router();

// The routes for deployment

passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));

router.get("/", passport.authenticate('basic', {session: false}), function(req, res) {
  res.status(200).send("This is where I would store my API documentation");
});

//*** Home page with create deck, select deck, and start ***//
router.get("/home", passport.authenticate('basic', {session: false}), function(req, res) {
  models.Deck.findAll()
  .then(function(data) {
    res.status(200).send({
      status: "Success",
      data: data});
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
});

//*** Create a new deck ***//
router.post("/newdeck", passport.authenticate('basic', {session: false}), function(req, res) {
  models.Deck.create({
    name: req.body.name,
    userId: req.user.id
  })
  .then(function(data) {
    res.status(201).send({
      status: "Success",
      data: data});
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
});

//*** Play a game ***//
router.get("/deck/:id/quiz", passport.authenticate('basic', {session: false}), function(req, res) {
  models.Deck.findOne({
    where: {id: req.params.id},
    include: [
      {model: models.Card, as: "Cards"}
    ]
  })
  .then(function(data) {
    res.status(200).send({
      status: "Success",
      data: data});
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
});

//*** Card Change page ***//
router.get("/deck/:id", passport.authenticate('basic', {session: false}), function(req, res) {
  models.Deck.findOne({
    where: {id: req.params.id},
    include: [
      {model: models.Card, as: "Cards"}
    ]
  })
  .then(function(data) {
    res.status(200).send({
      status: "Success",
      data: data});
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
});

//*** Create a new card ***//
router.post("/newcard/:id", passport.authenticate('basic', {session: false}), function(req, res) {
  models.Card.create({
    question: req.body.question,
    answer: req.body.answer,
    deckId: req.params.id
  })
  .then(function(data) {
    res.status(201).send({
      status: "Success",
      data: data});
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
});

//*** Change a card ***//
router.post("/deck/:deckId/change/:cardId", passport.authenticate('basic', {session: false}), function(req, res) {
  models.Card.update({
    question: req.body.question,
    answer: req.body.answer,
    deckId: req.params.deckId},
    {where: {id: req.params.cardId}}
  )
  .then(function(data) {
    res.status(201).send({
      status: "Success",
      data: data});
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
});

//*** Delete Card ***//
router.get("/trash/:id", passport.authenticate('basic', {session: false}), function(req, res) {
  models.Card.destroy({
    where: {id: req.params.id}
  })
  .then(function(data) {
    res.status(200).send({
      status: "Success",
      data: data});
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
})

module.exports = router;
