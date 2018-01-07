var data = require('../data/data.json');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res, next) {
      res.render('page/', data);
});

module.exports = router;
