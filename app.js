const cookieParser = require('cookie-parser');
const createError  = require('http-errors');
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors')

var keywordRouter  = require('./routes/keywords');
var skillsRouter   = require('./routes/skills');
var newsRouter     = require('./routes/newsy');


var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Express Generator Basics
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(cors())

// Establish Routes
app.use('/keywords', keywordRouter)
app.use('/skills', skillsRouter)
app.use('/newsy', newsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
