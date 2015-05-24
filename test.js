require('getusermedia')({
  audio: true,
  video: false
}, function(err, stream) {
  if (err) throw err
  require('./index')(stream).on('position', function(x, y) {
    // console.log(x, y)
  })
})
