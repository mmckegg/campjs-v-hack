var URI     = require('local-uri')
var leveljs = require('level-js')
var levelup = require('levelup')
var xhr     = require('xhr')
var db      = levelup('splatter', { db: leveljs })

xhr('/bundle.js', function(err, res, body) {
  if (err) return fallback(err)
  load(body)
})

function fallback(err) {
  db.get('latest', function(_err, result) {
    if (_err) throw err
    return load(result)
  })
}

function load(src) {
  var uri    = URI(src, 'text/javascript;charset=utf8')
  var script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', uri)
  document.body.appendChild(script)
}
