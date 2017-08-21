var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');


//req models
require('./models/Groups');
require('./models/Members');
require('./models/AttendanceSheets');
require('./models/Users');

require('./config/passport');
var config = require('./config/config');
mongoose.Promise = global.Promise;
mongoose.connect(config.database,{useMongoClient: true});
require('./config/initDb');

//req routes
var auth = require('./routes/auth');
var member = require('./routes/member');
var group = require('./routes/group');
var sheet = require('./routes/attendanceSheet');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'routes')));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(passport.initialize());
app.use(passport.session());

//define routes
app.use('/api/', auth);
app.use('/api/members', member);
app.use('/api/groups', group);
app.use('/api/sheets', sheet);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
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
