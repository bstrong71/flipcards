const express       = require("express");
const passport      = require("passport");
const models        = require("../models/index");
const BasicStrategy = require("passport-http").BasicStrategy;
const router        = express.Router();


passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));

router.get("/", passport.authenticate('basic', {session: false}), function(req, res) {
  res.send("This is where I would store my API documentation");
});

/////******** for TEMP*TEST*************//
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




module.exports = router;
