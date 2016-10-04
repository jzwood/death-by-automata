var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  return res.render('main', { title: 'Public Room', room: 'Public' })
})

module.exports = router;
