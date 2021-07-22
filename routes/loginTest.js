var express = require('express');
var router = express.Router();
var login = require('./login');

router.get('/', function (req, res, next) {
  var cookieToken = req.cookies.accessToken;
  var userEmail = 'ucabjjw@ucl.ac.uk';

  login(cookieToken, userEmail)
  .then(results => res.render('loginTest', {
    title: 'loginTest',
    login: results
  }))
})

module.exports = router;
