var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

morgan_format = '[:date[clf]] :method :url :status :res[content-length] - :response-time ms';

global.logger = require('./application/config/logger.js');

//load config files

global.app_config = require('./application/config/app.js');
global.constants_config = require('./application/config/constants.js');

//load helpers
global.app_helper = require('./application/helpers/app.js');


var indexRouter = require('./routes/index');
var seat_allocate_router = require('./routes/seat_allocate_router');
var update_seat_status_router = require('./routes/update_seat_status_router');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(logger('dev'));
//app.use(morgan('tiny', { stream: logger.stream }));
app.use(morgan(morgan_format, { stream: logger.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', seat_allocate_router);
app.use('/api/seats', update_seat_status_router);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
