var express = require('express');
var router = express.Router();

router.get('/readme', function(req, res, next) {
  return res.render('readme', { title: 'readme', room: 'public'})
})

router.get('/', function(req, res, next) {
  return res.render('main', { title: 'public_room', room: 'public' })
})

module.exports = router;
