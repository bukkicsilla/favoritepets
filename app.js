var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./models/db');

var index = require('./routes/index');
var indexApi = require('./routes/indexApi');
var users = require('./routes/users');

var nodemailer = require('nodemailer');
var passport = require('passport');  
var LocalStrategy = require('passport-local').Strategy;  
//var mongoose = require('mongoose');  
var flash = require('connect-flash'); 
var exflash = require('express-flash');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'petsecret',
                resave: true,
                saveUninitialized: true}));  
app.use(passport.initialize());  
app.use(passport.session());  
app.use(flash());
app.use(exflash());
require('./controllers/passport')(passport); 

app.use('/', index);
app.use('/api', indexApi);
app.use('/users', users);

// caching disabled for every route
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
