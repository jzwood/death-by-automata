var express = require('express');
var router = express.Router();
// var io = require('socket.io').listen(server);
// var sockets = require(path.join(__dirname,'/backend/sockets.js'));

/* GET private room. */
router.get('/:id([a-zA-Z0-9]{2,10})', function(req, res, next) {
  var id = req.params.id;
  // sockets.networking(io,'hello','123')
  res.render('index', { title: 'chat time', namespace: id });
})


module.exports = router;
