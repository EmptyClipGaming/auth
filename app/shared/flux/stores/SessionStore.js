var React = require("react");
var Fluxxor = require("fluxxor");

var sessionConstants = require("../constants/SessionConstants");

var SessionStore = Fluxxor.createStore({
  initialize: function() {
    this.session = {};
    this.loading = false;
    this.error = false;

    this.bindActions(
      sessionConstants.LOGIN, this.onLogin,
      sessionConstants.LOGIN_SUCCESS, this.onLoginSuccess,
      sessionConstants.LOGIN_FAILED, this.onLoginFailed,
      sessionConstants.LOGOUT, this.onLogout,
      sessionConstants.RESET_PASSWORD, this.onResetPassword
    );
  },

  onLogin: function(payload) {
    this.loading = true;
    this.emit("change");
  },

  onLoginSuccess: function(payload) {
    this.loading = false;
    this.error = null;
    this.session = payload.user;
    this.emit("change");
  },

  onLoginFailed: function(payload) {
    this.loading = false;
    this.error = payload.error.message || true;
    this.session = {};
    this.emit("change");
  },

  onLogout: function(payload) {},

  onResetPassword: function(payload) {},

});

module.exports = SessionStore;