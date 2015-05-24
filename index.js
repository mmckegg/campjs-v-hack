module.exports = boot

function boot(audio) {
  document.body.style.background = '#000'

  const canvas   = document.body.appendChild(document.createElement('canvas'))
  const gl       = require('gl-context')(canvas, render)
  const analyser = require('gl-audio-analyser')(gl, audio, window.context.audio)
  const mouse    = require('mouse-position')()
  const triangle = require('a-big-triangle')
  const Shader   = require('gl-shader')
  const glBuffer = require('gl-buffer')
  const glslify  = require('glslify')
  const Emitter  = require('events/')
  const FBO      = require('gl-fbo')
  const VAO      = require('gl-vao')
  const events   = new Emitter
  const start    = Date.now()
  const size     = 512

  var prev   = FBO(gl, [2, 2])
  var curr   = FBO(gl, [2, 2])
  var wavf   = FBO(gl, [2, 2])
  var width  = 100
  var height = 100
  var x      = 0
  var y      = 0

  const wave = VAO(gl, [{
    buffer: glBuffer(gl, createWaveData(size))
    , size: 1
  }])

  const shaders = {
    wave: Shader(gl
      , glslify('./wave.vert')
      , glslify('./wave.frag')
    ),
    post: Shader(gl
      , glslify('./post.vert')
      , glslify('./post.frag')
    ),
    draw: Shader(gl
      , glslify('./draw.vert')
      , glslify('./draw.frag')
    )
  }

  mouse.on('move', function() {
    events.emit('position', x = mouse.x / width, y = mouse.y / height)
  })

  function render() {
    width  = gl.drawingBufferWidth
    height = gl.drawingBufferHeight

    // wavf -> waveform graphic
    gl.disable(gl.DEPTH_TEST)
    gl.disable(gl.CULL_FACE)

    wavf.bind()
    wavf.shape = [width, height]
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.viewport(0, 0, width, height)

    wave.bind()
    shaders.wave.bind()
    shaders.wave.uniforms.audio = analyser.bindWaveform(2)
    shaders.wave.uniforms.mouse = [x, y]

    gl.lineWidth(5)
    gl.drawArrays(gl.LINE_STRIP, 0, size)

    // curr -> wave + last frame
    curr.bind()
    curr.shape = [width, height]
    gl.viewport(0, 0, width, height)

    shaders.post.bind()
    shaders.post.uniforms.resolution = [width, height]
    shaders.post.uniforms.wavf       = wavf.color[0].bind(0)
    shaders.post.uniforms.prev       = prev.color[0].bind(1)
    shaders.post.uniforms.time       = (Date.now() - start) / 1000
    shaders.post.uniforms.mouse      = [x, y]
    triangle(gl)

    // screen <- curr
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, width, height)
    shaders.draw.bind()
    shaders.draw.uniforms.resolution = [width, height]
    shaders.draw.uniforms.curr       = curr.color[0].bind(0)
    shaders.draw.uniforms.mouse      = [x, y]
    triangle(gl)

    // prev -> curr
    // curr -> prev
    var c = prev, p = curr
    prev = p
    curr = c
  }

  window.addEventListener('resize'
    , require('canvas-fit')(canvas, null, 1.5)
    , false
  )

  return events
}

function createWaveData(size) {
  var data = new Float32Array(size)
  var smo  = size - 1

  for (var i = 0; i < size; i++) {
    data[i] = i / smo
  }

  return data
}
