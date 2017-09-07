const express  = require("express");
const models   = require("../models/index");
const router   = express.Router();
const bcrypt   = require("bcrypt");

const passport = require("passport");

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

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
}));

router.get("/signup", function(req, res) {
  res.render("signin");
});

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

router.get("/home", isAuthenticated, function(req, res) {
  res.render("home");
});



router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
