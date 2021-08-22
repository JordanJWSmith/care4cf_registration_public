var express = require('express');
const checkNHSNum = require('./checkNHSNum');
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
      res.render('loginTest', {title: 'CARE4CF'})
    }
  })
})

router.post('/verify', function(req, res, next) {
    const userDetails = req.body;
    var email = userDetails.email;
    var token = userDetails.token;
    var name = userDetails.name;

    // var nhsNum = req.cookies.
    // var err = JSON.stringify(req.cookies.err);
    // res.clearCookie('err');

    // if (err) {
    //   var err = true;
    // } else {
    //   var err = false;
    // }
    
    userExists(email)
    .then(function(results) {
      // console.log(' userExists results (should be false):',  results)
      if (results.logIn) {
        // console.log('Updating token');
        // console.log('userID: ', results.userID);
        var userID = results.userID;
        updateToken(token, email, userID)
        .then(res.redirect('/'));
      } else {
        // console.log('Create new user');
        var lName = name.split(",")[0].trim();
        var fName = name.split(",")[1].trim();
        res.render('users', {
          title: 'Welcome', 
          email: email, 
          lName: lName, 
          fName: fName, 
          token: token, 
          // err: err
        });
      }
    })
    // userExists().then()if userExists, updateToken and redirect to index.
    // if userNotExists, redirect to /new

});

router.post('/new', async function(req, res, next) {
  const userDetails = req.body;
  // console.log('userDetails: ', userDetails);
  var nhsNum = userDetails.nhsNumber;
  await checkNHSNum(nhsNum)
  .then(async function(nhsResults) {
    // console.log('nhs num check: ', nhsResults);
    // res.send(JSON.stringify(nhsResults));
    if (nhsResults) {
      // console.log('adding new user');
      await newUser(userDetails)
      .then(async function(newUserResult) {
        // console.log('newUserResult: ', newUserResult);
        // console.log('updating token');
        await updateToken(userDetails.msalToken, userDetails.email, newUserResult)
      })
      .then(function() {
        res.redirect('/')
      })
    } else {
      res.redirect('/back?n=' + nhsNum);
      // backURL=req.header('Referer')
      // res.redirect(backURL);

    }
  })
    // newUser(userDetails)
    // .then(function(results) {
    //   // console.log('error type: ', typeof results);
    //   res.redirect('/');

      
    // })
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
