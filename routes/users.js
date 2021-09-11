var express = require('express');
var router = express.Router();
var db = require('../database');
var cookieParser = require('cookie-parser');

router.get('/', function(req, res, next) { 
  res.redirect('/');
});


module.exports = router;
