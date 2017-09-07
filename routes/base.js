const express       = require("express");
const models        = require("../models/index");
const router        = express.Router();
const bcrypt        = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;
const passport      = require("passport");

//** Middleware to verify logged in **//
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error', 'You have to be logged in to access the page.')
  res.redirect('/')
};

router.get("/", function(req, res) {
  res.render("signin", {
      messages: res.locals.getMessages()
  });
});

//*** Login ***//
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
}));

router.get("/signup", function(req, res) {
  res.render("signin");
});

//*** Sign Up new user ***//
router.post("/signup", function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    req.flash('error', "Please, fill in all the fields.")
    res.redirect('signin')
  }
  let salt = bcrypt.genSaltSync(10)
  let hashedPassword = bcrypt.hashSync(password, salt)
  let newUser = {
    username: username,
    password: hashedPassword,
    salt: salt
  }
  models.User.create(newUser).then(function() {
    res.redirect('/');
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.")
    res.redirect('/signup')
  });
});

//*** Home page with create deck, select deck, and start ***//
router.get("/home", isAuthenticated, function(req, res) {

  res.render("home", {user: req.user.username});
});

 /////********TEMP*TEST DATA to DELETE LATER********//
const datahere = {
  id: 1,
  username: "isaac",
  password: "asdfasdfasdfasdfs",
  salt: "asdflkhdfg",
  favColor: "blue",
  admin: false
}

router.get("/api/bro", function(req, res) {
  res.status(200).json(datahere)
});
// *******************************************//
// *******************************************//

//*** View a new deck ***//
router.get("/newdeck", function(req, res) {
  res.render("newdeck")
})

//*** Create a new deck ***//
router.post("/newdeck", function(req, res) {
  models.Deck.create({
    name: req.body.name,
    userId: req.user.id
  })
  .then(function(data) {
    res.redirect("/home");
  })
  .catch(function(err) {
    res.render("problem", {error: err});
  });
});



router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
