var express = require('express');
var router = express.Router();
var login = require('./login');

// Display the welcome page, otherwise redirect to login
router.get('/', function(req, res, next) {
  var cookieToken = req.cookies.accessToken;
  login(cookieToken)
  .then(function(results) {
    console.log('index results: ', results);
    if (results.logIn) {
      res.render('index', {title: 'Thank you for registering.', fName: results.fName})
    } else {
      res.redirect('/loginUser')
    }
  })
  
});

module.exports = router;
