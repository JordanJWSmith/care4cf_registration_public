var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.query.n);
    n = req.query.n;

    res.render('back', {err: n});
})

module.exports = router;