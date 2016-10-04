var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

/* GET private room. */
router.post('/', function(req, res, next) {
  var simplepw = req.body.room
  if(!simplepw){
    return res.redirect('../');
  }
  if(/ /.test(simplepw)){
    return res.redirect('../errorMessage');
  }
  console.log('post',simplepw)
  return res.redirect('/private/' + sha1(simplepw))
})

router.get('/:id([a-z0-9]{40})', function(req, res, next) {
  return res.render('main', { title: req.query.room, room: req.params.id });
})

router.get('/', function(req, res, next) {
  return res.redirect('../');
})

module.exports = router;
