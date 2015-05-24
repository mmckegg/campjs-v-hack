var rates = [2, 1, 3/8, 1/2, 1/3, 1/4, 1/8, 1/16, 1/32]

require('./entry')
require('./index')(window.context.output).on('position', function(x, y) {
  window.pitch.set(Math.floor(x * 30))
  var r = Math.floor(y * rates.length)
  window.rate.set(rates[r])
})
