var express = require('express');
var router = express.Router();

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
    if (err) throw err;

    res.send(account);
  });
});

module.exports = router;
