exports.catch404 = function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
}

exports.developmentError = function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err
  })
}

exports.productionError = function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
}
