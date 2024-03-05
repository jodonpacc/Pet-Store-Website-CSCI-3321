var createError = require('http-errors');
var express = require('express');
const db = require("./db_connection.js").db_connection;
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const product = require('./routes/product.js');
const account = require('./routes/account.js');

//for cross origin resource sharing (to share with React)???
const cors = require('cors');
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/account', account);

app.use('/product', product)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//default middleware set up for god knows what reason
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
