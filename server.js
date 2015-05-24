const browserify = require('browserify')
const course     = require('course')
const http       = require('http')
const path       = require('path')
const fs         = require('fs')

const router = course()

router.get('/', serve('index.html', 'text/html'))
router.get('/index.html', serve('index.html', 'text/html'))
router.get('/bundle.js', function(req, res) {
  res.setHeader('content-type', 'text/javascript')
  browserify(
    require.resolve('./run.js')
  ).bundle().pipe(res)
})

router.get('/cache.manifest', serve('cache.manifest', 'text/cache-manifest'))
router.get('/bootstrap.js', function(req, res) {
  res.setHeader('content-type', 'text/javascript')
  browserify(
    require.resolve('./bootstrap.js')
  ).bundle().pipe(res)
})

http.createServer(function(req, res) {
  router(req, res, function(err) {
    if (err) return bail(err, req, res)
    res.statusCode = 404
    res.end('404')
  })
}).listen(process.env.PORT || 9966, function(err) {
  if (err) throw er
  console.log('ready')
})

function bail(err, req, res) {
  res.setHeader('content-type', 'text/plain')
  res.statusCode = 500
  res.end(err.message)
}

function serve(file, type) {
  file = path.resolve(__dirname, file)

  return function(req, res) {
    res.setHeader('content-type', type)
    fs.createReadStream(file).pipe(res)
  }
}
