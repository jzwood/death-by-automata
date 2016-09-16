var express = require('express');
var router = express.Router();

/* GET private room. */
router.get('/:id([a-zA-Z0-9]{2,10})', function(req, res, next) {
  var id = req.params.id;
  res.render('index', { title: 'chat time', namespace: id });
})

module.exports = router;
