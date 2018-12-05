// Main file for this Node/Express web application.
// Chris Joakim, Microsoft, 2018/11/22

var   express    = require('express');
var   path       = require('path');
var   bodyParser = require('body-parser');
var   logger     = require('morgan');
var   cookieParser = require('cookie-parser');
const uuidv4     = require('uuid/v4');
const process    = require('process');

//const azu        = require('./lib/azu');

var app = express();

app.use(bodyParser.json()) 

var now = new Date();
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';
app.locals.pid = process.pid;
app.locals.start_date = now;
app.locals.start_epoch = now.getTime();
app.locals.some_uuid = uuidv4();

console.log('app.locals.ENV: ' + app.locals.ENV);
console.log('app.locals.pid: ' + app.locals.pid);
console.log('app.locals.start_date: ' + app.locals.start_date);
console.log('app.locals.start_epoch: ' + app.locals.start_epoch);
console.log('app.locals.some_uuid: ' + app.locals.some_uuid);

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
