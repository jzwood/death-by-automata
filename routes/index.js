var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {
    title: 'Public Chat'
  });
});

router.get('/errorMessage', function(req, res, next) {
  res.render('home', {
    title: 'Public Chat',
    errorMsg: 'No Spaces'
  });
});

module.exports = router;
