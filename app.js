var Promise = require("bluebird");
var dotenv = require("dotenv");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stormpath = require("stormpath");
var passport = require("passport");
var session = require("express-session");
var StormpathStrategy = require("passport-stormpath");
var app = express();

app.set('port', process.env.PORT || 3000);
dotenv.load();

function StartServer() {
  PreRouteMiddleware()
    .then(RouteMiddleware)
    .then(PostRouteMiddleware)
    .then(function() {
      var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
      });
    })
    .catch(function(error) {
      console.error(error);
    });
}

function PreRouteMiddleware() {
  return new Promise(function(resolve, reject) {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    app.use(favicon(__dirname + '/public/ECG_favicon.png'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    require("node-jsx").install();
    var key = new stormpath.ApiKey(process.env.STORMPATH_API_KEY_ID, process.env.STORMPATH_API_KEY_SECRET);
    var client = new stormpath.Client({apiKey: key});
    var strategy = new StormpathStrategy();

    passport.use(strategy);
    passport.serializeUser(strategy.serializeUser);
    passport.deserializeUser(strategy.deserializeUser);
    app.use(session({ secret: "adsgfjaklajkl;46j;kl6bkjlgkjl;gkl;jadfbh", key: 'sid', cookie: {secure: false} }));
    app.use(passport.initialize());
    app.use(passport.session());

    client.getApplications({name: "Empty Clip Gaming"}, function(err, applications) {
      if (err) return reject(err);

      app.use(function(req, res, next) {
        req.stormpath = applications.items[0];
        next();
      });

      return resolve();
    });
  });
}

function RouteMiddleware() {
  return new Promise(function(resolve, reject) {
    var api = require("./routes/api");
    app.use('/api', api);

    /**
     * React Router Setup
     */

    var React = require("react");
    var Router = require("react-router");
    var ReactApplication = require("./app/Main.jsx");

    app.use(function(req, res) {
      Router.run(ReactApplication, req.url, function(Handler) {
        var flux = require("./app/shared/flux/FluxApplication");
        res.render("index", { application: React.renderToString(Handler({flux: flux}))});
      });
    });

    return resolve();
  });
}

function PostRouteMiddleware() {
  return new Promise(function(resolve, reject) {
    // catch 404 and forward to error handler
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
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    return resolve();
  });
}

module.exports = app;

StartServer();
