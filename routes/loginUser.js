var express = require('express');
const checkNHSNum = require('./checkNHSNum');
var router = express.Router();
var login = require('./login');
const newUser = require('./newUser');
const updateToken = require('./updateToken');
var userExists = require('./userExists');

// Display the login page if not logged in
router.get('/', function (req, res, next) {
  var cookieToken = req.cookies.accessToken;
  login(cookieToken)
  .then(function(results) {
    if (results.logIn) {
      res.redirect('/');
    } else {
      res.render('loginUser', {title: 'CARE4CF'})
    }
  })
})

// Receive login data
router.post('/verify', function(req, res, next) {
    const userDetails = req.body;

    if (typeof userDetails.email !== "string") {
      var email = userDetails.email[0];
    } else {
      var email = userDetails.email;
    }

    if (typeof userDetails.token !== "string") {
      var token = userDetails.token[0];
    } else {
      var token = userDetails.token;
    }

    if (typeof userDetails.name !== "string") {
      var name = userDetails.name[0];
    } else {
      var name = userDetails.name;
    }

    // Check to see if the user already exists in the DB
    userExists(email)
    .then(function(results) {
      if (results.logIn) {
        var userID = results.userID;

        // Update the user's accessToken
        updateToken(token, email, userID)
        .then(res.redirect('/'));
      } else {
        if (name) {
          try {
            if (name.indexOf(',') !== -1) {
              var lName = name.split(",")[0].trim();
              var fName = name.split(",")[1].trim();
            } else {
              var lName = name.split(" ")[1].trim();
              var fName = name.split(" ")[0].trim();
            }
          }
          catch {
            var lName = 'Not given';
            var fName = 'Not given';
          }
        } else {
          var lName = 'Not given';
          var fName = 'Not given';
        }
        res.render('users', {
          title: 'Welcome', 
          email: email, 
          lName: lName, 
          fName: fName, 
          token: token, 
        });
      }
    })

});


// Save a new user
router.post('/new', async function(req, res, next) {
  const userDetails = req.body;
  var nhsNum = userDetails.nhsNumber;

  // Check the NHSNumber is unique
  await checkNHSNum(nhsNum)
  .then(async function(nhsResults) {
    if (nhsResults) {

      // Save the new user
      await newUser(userDetails)
      .then(async function(newUserResult) {

        // Update their accessToken
        await updateToken(userDetails.msalToken, userDetails.email, newUserResult)
      })
      .then(function() {
        res.redirect('/')
      })
    } else {
      res.redirect('/back?n=' + nhsNum);

    }
  })

})




module.exports = router;
