var express = require('express');
var router = express.Router();
var db = require('../database');
var login = require('./login');
const userExists = require('./userExists');
const updateToken = require('./updateToken');

router.get('/', function(req, res, next) {
  var cookieToken = req.cookies.accessToken;

  // Hard coded: need to change
  var userEmail = 'ucabjjw@ucl.ac.uk';


  login(cookieToken, userEmail)
  .then(results => res.render('index', { 
    title: 'CARE4CF Registration', 
    login: results.logIn,
    name: results.fName
  }))
})

router.post('/verify', function(req, res, next) {
  const userDetails = req.body;
  var email = userDetails.email;
  var token = userDetails.token;
  var name = userDetails.name;

  // userExists(email)
  // .then(function(results) {
  //   console.log('results index', results);
  //   if (!results.login) {
  //     console.log('Create new user');
  //     var lName = name.split(",")[0].trim();
  //     var fName = name.split(",")[1].trim();
  //     res.render('users', {title: 'Please register', email: email, lName: lName, fName: fName, token: token});
  //   // } else if (results.logIn == false) {
  //   //   console.log('Update token, results:', results.logIn);
  //   //   updateToken(token, email)
  //   //   .then(res.redirect('/'));
    
  //   } else {
  //     console.log('Logged in');
  //     res.redirect('/')
  //   }
    
  // });
  var checkUser = 'SELECT * FROM users WHERE email = "' + email + '"';

  // var results = await readData(checkUser);

  
  //   console.log('results: ', results);
  //   if (results.length == 0) {

  //     console.log('Create new user');
  //     var lName = name.split(",")[0].trim();
  //     var fName = name.split(",")[1].trim();
  //     res.render('users', {title: 'Welcome', email: email, lName: lName, fName: fName, token: token});
    
  //   } else if (results[0].msalToken !== token) {

  //     console.log('Update token')
  //     var updateToken = 'UPDATE users SET msalToken = "' + token + '" WHERE email = "' + email + '"';
  //     readData(updateToken).then(res.redirect('/'));
  //   } else {
  //     res.redirect('/');
  //     console.log('Log user in');
  //   }

  // })
  
  db.query(checkUser, function (err, results, fields) {
        if (err) throw err;
        else console.log('CHECK: Selected ' + results.length + ' row(s).');
        
        // If no user, create one
        if (results.length == 0) {
          console.log('Create new user');
          var lName = name.split(",")[0].trim();
          var fName = name.split(",")[1].trim();
          res.render('users', {title: 'Welcome', email: email, lName: lName, fName: fName, token: token});

        } else {
          // console.log(results);
          if (results[0].msalToken !== token) {
            // If there is a user but the access tokens don't match
            // Request refresh? How?
            
            var updateToken = 'UPDATE users SET msalToken = "' + token + '" WHERE email = "' + email + '"';
            db.query(updateToken, function(err, results, fields) {
              if (err) throw err;
              else console.log('Token updated');
            })
            res.redirect('/');
            console.log('user exists but token does not match');
          } else {
            // User exists and token matches. Log in. 
            // res.send(userDetails);
            res.redirect('/');
            console.log('Log user in');
          }
        }

      }) 

});

router.post('/new', function(req, res, next) {
  
  // store all the user input data
  const userDetails = req.body;
  var newUser = 'INSERT INTO users SET ?'
  db.query(newUser, userDetails, function(err, results, fields) {
    if (err) throw err;
    else console.log('New record added');
  })
  res.redirect('/');
   
}); 








  
  // console.log(email);
  
  // insert user data into users table
  // TODO: catch SQL errors


  // Promise.all([
  //   db.query(sql, userDetails,function (err, data) { 
  //     if (err) throw err;
  //         console.log("User data is inserted successfully"); 
  // }), 
  // db.query(readSQL, 
  //   function (err, results, fields) {
  //       if (err) throw err;
  //       else console.log('Selected ' + results.length + ' row(s).');
  //       for (i = 0; i < results.length; i++) {
  //           console.log('Row: ' + JSON.stringify(results[i]));
  //       }
  //   }), 
  
  // ])
  // .then(db.query(updateSQL, function (err, data) { 
  //   if (err) throw err;
  //       console.log("MSAL token added successfully "); 
  // }))
  // .then(res.redirect('/'));

/* GET home page. */
// router.get('/', function(req, res, next) {

//   var idToken = req.cookies['msal.idtoken'];
//   console.log('idToken: ', idToken);

//   if (!(typeof idToken === 'undefined')) {

      
//     var sql = 'SELECT userID FROM users WHERE msalToken = "' + idToken + '"'; 
//     // var sql = 'SELECT userID FROM users WHERE msalToken = "' + 'falseToken' + '"';
    
//     function get_info(query, callback) {
//       db.query(query, function(err, results){
//         if (err) {
//           throw err;
//         }
//         return callback(results);
//       })
//     }

//     get_info(sql, function(result){
//       var userID = result;
//       if (typeof userID[0] === 'undefined') {
    
//         console.log('userID undefined');
        
//         var login = false;
//         var reason = 'Cookie is invalid';
//         res.render('index', { title: 'Not logged in', login: login, reason: reason});
        
//       } else {
//         console.log('userID: ', userID);
//         console.log('Inside array: ', userID[0]);
//         console.log(typeof userID[0]);
//         console.log(userID[0].userID);
//         var userNum = userID[0].userID;
//         var login = true;
//         res.render('index', { title: 'Logged in', login: login, userNum: userNum});
//       }


//     });

//   } else {
//     console.log('cookie does not exist');
//     var login = false;
//     var reason = 'cookie does not exist';
//     res.render('index', { title: 'Not logged in', login: login, reason: reason});

    
//   }

  
// });

module.exports = router;
