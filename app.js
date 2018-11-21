// Main file for this Node/Express web application.
// Chris Joakim, Microsoft, 2018/11/21

var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var logger     = require('morgan');
var cookieParser = require('cookie-parser');

var azu = require('./lib/azu');

var app = express();

app.use(bodyParser.json()) 

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// Application routers
var index_router = require('./routes/index');
var admin_router = require('./routes/admin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// These Express Routers implement the HTTP endpoints for this app
app.use('/',       index_router);
app.use('/admin',  admin_router);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

module.exports = app;
