var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {
    title: 'Public Chat',
    heading: 'Landing Page'
  });
});

module.exports = router;
