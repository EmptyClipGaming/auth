var express = require('express');
var router = express.Router();
var passport = require("passport")

/* GET users listing. */
router.get('/', function(req, res) {
  req.stormpath.createAccount({
    givenName: "Test",
    surname: "Test",
    username: "Test",
    email: "test123@test.com",
    password: "tesGt1244443",
    customData: {
      favoriteColor: "Blye"
    }
  }, function(err, account) {
    if (err) console.error(err);

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
