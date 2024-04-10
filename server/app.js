var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const product = require('./routes/product.js').productRouter;
const account = require('./routes/account.js');
const admin = require('./routes/admin.js');
const cart = require('./routes/cart.js');
const home = require('./routes/home.js');

// These two lines should be on any file that needs to manage the session
const sess = require('./session.js').sessionSetup;
app.use(sess);

//for cross origin resource sharing (to share with React)???
const cors = require('cors');
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello');
});

// Use account.js route in ./routes for /account
app.use('/account', account);


// Use product.js route in ./routes for /product
app.use('/product', product);

// Use admin.js route in ./routes for /admin
app.use('/admin', admin)

app.use('/cartapi', cart);

app.use('/home', home);


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
