var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

require('./lib/connect_mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes/index'));

// Rutas del API
app.use('/apiv1/anuncio', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuario', require('./routes/apiv1/usuarios'));

// Contenido estático
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  
  if (err.array) {
    err.status = 422; // Unprocessable Entity (wikipedia)
    const errInfo = err.array({ onlyFirstError: true })[0];  // err.array devuelve siempre un array
    err.message = isAPI(req) ? 
    { message: 'Not valid', errors: err.mapped() } :
    `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }
  res.status(err.status || 500);

  if (isAPI(req)) { // Si es un API devuelvo siempre json
    res.json({sucess: false, error: err.message});
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}


module.exports = app;
