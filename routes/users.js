var express = require('express');
var router = express.Router();
var db = require('../database');
var cookieParser = require('cookie-parser');

// router.get('/', function(req, res, next) { 


//   var idToken = req.cookies['msal.idtoken'];

//   if (!(typeof idToken === 'undefined')) {
//     console.log('cookie exists');

//     var sql = 'SELECT userID FROM users WHERE msalToken = "' + idToken + '"';
    
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

//         var login = false;
//         var reason = 'Incorrect cookie';
//         res.render('users', { title: 'Users', login: login, reason: reason})
      
//       } else {

//         // var userNum = userID[0].userID;
//         var login = true;
//         var reason = 'You are logged in'
//         res.render('users', { title: 'Users', login: login, reason: reason});

//       }
      
//     });



//   } else {
//     var login = false;
//     var reason = 'Cookie does not exist';
//     res.render('users', { title: 'Users', login: login, reason: reason})
//   }


//   // IF cookie exists AND IF cookie value is in database THEN display 'already logged in'


//   // res.render('users', { title: 'Users' }); 
// });




// router.post('/create', function(req, res, next) {
  
//   var idToken = req.cookies['msal.idtoken'];
  
//   // store all the user input data
//   const userDetails = req.body;
//   const email = req.body.email;
//   // console.log(email);
  
//   // insert user data into users table
//   // TODO: catch SQL errors
//   var sql = 'INSERT IGNORE INTO users SET ?'

//   var readSQL = 'SELECT * FROM users WHERE email = "' + email + '"';
  
//   var updateSQL = 'UPDATE users SET msalToken = "' + idToken + '" WHERE email = "' + email + '"';

//   Promise.all([
//     db.query(sql, userDetails,function (err, data) { 
//       if (err) throw err;
//           console.log("User data is inserted successfully"); 
//   }), 
//   db.query(readSQL, 
//     function (err, results, fields) {
//         if (err) throw err;
//         else console.log('Selected ' + results.length + ' row(s).');
//         for (i = 0; i < results.length; i++) {
//             console.log('Row: ' + JSON.stringify(results[i]));
//         }
//     }), 
  
//   ])
//   .then(db.query(updateSQL, function (err, data) { 
//     if (err) throw err;
//         console.log("MSAL token added successfully "); 
//   }))
//   .then(res.redirect('/'));
   
// }); 


// router.post('/check', function(req, res, next) {
//   var idToken = req.cookies['msal.idtoken'];
//   const testDetails = req.body;
//   console.log('user email: ', testDetails);
//   console.log('just email: ', testDetails.check)
//   userEmail = testDetails.check;

//   var readEmail = 'SELECT * FROM users WHERE email = "' + userEmail + '"';
//   var updateSQL = 'UPDATE users SET msalToken = "' + idToken + '" WHERE email = "' + userEmail + '"';

//   db.query(readEmail, function (err, results, fields) {
//     if (err) throw err;
//     else console.log('CHECK: Selected ' + results.length + ' row(s).');
//     for (i = 0; i < results.length; i++) {
//         console.log('Row: ' + JSON.stringify(results[i]));
//     }
//     if (results.length == 1) {
//       db.query(updateSQL, function (err, data) { 
//         if (err) throw err;
//             console.log("MSAL token added successfully "); 
//       })
//       res.redirect('/');
//     } else {
//       res.redirect('/users');
//     }
//   })
  

// // res.redirect('users?new=1')
// });

  module.exports = router;
