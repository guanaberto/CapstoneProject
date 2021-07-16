var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
// my version
//Adds the reference to DB
require('./app_server/models/db');


//var indexRouter = require('./routes/index');
/*var usersRouter = require('./routes/users');*/
//Route to the baking bella api
var apiRouter = require('./app_api/routes/bakingbella');

var app = express();


// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// to add in the future and relate with Angular
app.use('/api',(req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});


//Commented to remove PUG: app.use('/', indexRouter);
//to add in the future and relate with Angular 
app.use(express.static(path.join(__dirname,'app_public','build')));

/*app.use('/users', usersRouter);*/
app.use('/api', apiRouter);


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

//To solve problem with localhost and CORS
const whitelist = ['http://localhost:3000']; // list of allow domain
const corsOptions = {
  origin: function (origin, callback) {
      if (!origin) {
          return callback(null, true);
      }

      if (whitelist.indexOf(origin) === -1) {
          var msg = 'The CORS policy for this site does not ' +
              'allow access from the specified Origin.';
          return callback(new Error(msg), false);
      }
      return callback(null, true);
  }
}
app.use(cors(corsOptions));


module.exports = app;
