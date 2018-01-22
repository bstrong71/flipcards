const express         = require("express");

// mustache-express gives access to the views
const mustacheExpress = require("mustache-express");

// body-parser parses incoming requests in a middleware
// can access content of json thru req.body
const bodyParser      = require("body-parser");

// path gives app connection to public and views folders
const path            = require("path");

const routes          = require("./routes/base");
const api             = require("./routes/api");

// morgan show request status codes in CLI
const morgan          = require("morgan");

// used for authentication for local and basics
const passport        = require("passport");
const LocalStrategy   = require("passport-local").Strategy;
const BasicStrategy   = require('passport-http').BasicStrategy;

// allows saving cookie for current session
const session         = require("express-session");

// provides flash messages for rendering/redirecting
const flash           = require("express-flash-messages");

const model           = require("./models/index");

// pashword hashing function
const bcrypt          = require("bcrypt");

// parses cookies and puts the info on req object in the middleware
const cookieParser    = require("cookie-parser");

// initialize Express App
const app = express();


// added next line for hosting out in production
app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, "public")));

app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));

app.use(cookieParser());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});

const authenticateUser = function(username, password, done) {
  model.User.findOne({
    where: {
      'username': username.toLowerCase()
    }
  }).then(function (user) {
    if (user == null) {
      return done(null, false, { message: 'Invalid email and/or password: please try again' })
    }

    let hashedPassword = bcrypt.hashSync(password, user.salt)

    if (user.password === hashedPassword) {
      return done(null, user)
    }

    return done(null, false, { message: 'Invalid email and/or password: please try again' })
  })
}

passport.use(new LocalStrategy(authenticateUser))
passport.use(new BasicStrategy(authenticateUser))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  model.User.findOne({
    where: {
      'id': id
    }
  }).then(function (user) {
    if (user == null) {
      done(new Error('Wrong user id'))
    }
    done(null, user)
  })
})

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    model.User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.use('/api', require('./routes/api'));
app.use('/', require("./routes/base"));

app.use('/api', routes);
app.use(routes);

if(require.main === module) {
  app.listen(app.get('port'), function() {
    console.log("Node app is running on port", app.get('port'));
  })
};

module.exports = app;
