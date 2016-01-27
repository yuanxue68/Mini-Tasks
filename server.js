var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');
var passport = require('passport');

//required configs
var configDB = require('./server/config/database');
require('./server/config/passport');

var app = express();
mongoose.connect(configDB.url);
var port = 3000;

//for dev only
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//mount middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());
app.use(express.static('public'));
app.use(passport.initialize());

//require express routers
app.use('/api/users', require('./server/api/user.api'))
app.use('/api/auth', require('./server/api/auth.api'))

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("=> 🌎  Listening on port 3000");
  }
});