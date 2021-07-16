var express = require('express');
var router = express.Router();
var db = require('../database');
const { requiresAuth } = require('express-openid-connect');



/* GET home page. */
router.get('/', function(req, res, next) {

  var idToken = req.cookies['msal.idtoken'];
  console.log('idToken: ', idToken);

  if (!(typeof idToken === 'undefined')) {

      
    var sql = 'SELECT userID FROM users WHERE msalToken = "' + idToken + '"'; 
    // var sql = 'SELECT userID FROM users WHERE msalToken = "' + 'falseToken' + '"';
    
    function get_info(query, callback) {
      db.query(query, function(err, results){
        if (err) {
          throw err;
        }
        return callback(results);
      })
    }

    get_info(sql, function(result){
      var userID = result;
      if (typeof userID[0] === 'undefined') {
    
        console.log('userID undefined');
        
        var login = false;
        var reason = 'Cookie is invalid';
        res.render('index', { title: 'Not logged in', login: login, reason: reason});
        
      } else {
        console.log('userID: ', userID);
        console.log('Inside array: ', userID[0]);
        console.log(typeof userID[0]);
        console.log(userID[0].userID);
        var userNum = userID[0].userID;
        var login = true;
        res.render('index', { title: 'Logged in', login: login, userNum: userNum});
      }


    });

  } else {
    console.log('cookie does not exist');
    var login = false;
    var reason = 'cookie does not exist';
    res.render('index', { title: 'Not logged in', login: login, reason: reason});

    
  }

  
});

module.exports = router;
