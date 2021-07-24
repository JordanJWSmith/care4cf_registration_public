var express = require('express');
var router = express.Router();
var login = require('./login');
const newUser = require('./newUser');
const updateToken = require('./updateToken');
var userExists = require('./userExists');

router.get('/', function (req, res, next) {
  var cookieToken = req.cookies.accessToken;
  login(cookieToken)
  .then(function(results) {
    if (results.logIn) {
      res.redirect('/');
    } else {
      res.render('loginTest', {title: 'Please sign in'})
    }
  })
})

router.post('/verify', function(req, res, next) {
    const userDetails = req.body;
    var email = userDetails.email;
    var token = userDetails.token;
    var name = userDetails.name;
    
    userExists(email).then(function(results) {
      // console.log(' userExists results (should be false):',  results)
      if (results.logIn) {
        console.log('Updating token');
        updateToken(token, email).then(res.redirect('/'));
      } else {
        console.log('Create new user');
        var lName = name.split(",")[0].trim();
        var fName = name.split(",")[1].trim();
        res.render('users', {title: 'Welcome', email: email, lName: lName, fName: fName, token: token});
      }
    })
    // userExists().then()if userExists, updateToken and redirect to index.
    // if userNotExists, redirect to /new

});

router.post('/new', function(req, res, next) {
  const userDetails = req.body;
  newUser(userDetails).then(res.redirect('/'));
})


//   var cookieToken = req.cookies.accessToken;
//   var userEmail = 'ucabjjw@ucl.ac.uk';

//   login(cookieToken, userEmail)
//   .then(results => res.render('loginTest', {
//     title: 'loginTest',
//     login: results
//   }))
// })

module.exports = router;
