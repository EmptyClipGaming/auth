var Promise = require("bluebird");
var request = require("superagent");

var session = {
  login: function(username, password) {
    return new Promise(function(resolve, reject) {
      request
        .post("/api/login")
        .send({username: username, password: password})
        .end(function(error, results) {
          if (error) return reject(true);
          if (results.unauthorized) return reject(results.body);
          if (!results.ok) return reject(true);

          return resolve(results.body);
        });
    });
  },

  register: function(user) {
    return new Promise(function(resolve, reject) {
      request
        .post("/api/register")
        .send(user)
        .end(function(error, results) {
          if (error) return reject(true);
          if (!results.ok) return reject(true);

          return resolve(results.body);
        });
    });
  }
};

module.exports = session;