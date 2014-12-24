var Fluxxor = require("fluxxor");

var SessionStore = require("./stores/SessionStore");
var SessionConstants = require("./constants/SessionConstants");

var SessionService = require("./services/session");

var stores = {
  SessionStore: new SessionStore()
};

var actions = {
  login: function(username, password) {
    this.dispatch(SessionConstants.LOGIN);
    console.log(SessionService);
    SessionService
      .login(username, password)
      .then(function(user) {
        this.dispatch(SessionConstants.LOGIN_SUCCESS, {user: user});
      }.bind(this))
      .catch(function(error) {
        this.dispatch(SessionConstants.LOGIN_FAILED, {error: error});
      }.bind(this));
  },

  logout: function() {
    this.dispatch(SessionConstants.LOGOUT);
  },

  resetPassword: function(username) {
    this.dispatch(SessionConstants.RESET_PASSWORD, {username: username});
  },

  register: function(user) {
    this.dispatch(SessionConstants.REGISTER);

    SessionService
      .register(user)
      .then(function(user) {
        this.dispatch(SessionConstants.REGISTER_SUCCESS, {user: user});
      }.bind(this))
      .catch(function(error) {
        this.dispatch(SessionConstants.REGISTER_FAILED, {error: error});
      }.bind(this));
  },
};

var FluxApp = new Fluxxor.Flux(stores, actions);

FluxApp.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

module.exports = FluxApp;