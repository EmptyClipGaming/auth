var express = require('express');
var router = express.Router();
var passport = require("passport")

router.post("/register", function(req, res) {
  req.stormpath.createAccount({
    givenName: req.body.first_name,
    surname: req.body.last_name,
    username: req.body.display_name,
    email: req.body.email,
    password: req.body.password
  }, function(err, account) {
    if (err) return res.status(err.status).send(err);

    res.send(account);
  });
});

router.post("/login", function(req, res, next) {
  passport.authenticate("stormpath", function(err, user, info) {
    if (err) return res.status(500).end();
    if (!user) return res.status(401).send(info);
    return res.status(200).send(user);
  })(req, res, next);
});

module.exports = router;
