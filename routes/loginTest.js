var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('loginTest', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});


module.exports = router;
