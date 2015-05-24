var Ditty = require('ditty')
var AudioSlot = require('audio-slot')
var Observ = require('observ')
var computed = require('observ/computed')

var Synth = require('./synth')
var context = require('./context')

var player = Ditty()
var synth = Synth(context)

window.context = context

var rate = Observ(1)
var pitch = Observ(0)

window.rate = rate
window.pitch = pitch

context.scheduler.start()

computed([rate, pitch], function(rate, pitch){
  player.set('synth', [
    [0, rate/2, pitch]
  ], rate)
})

context.scheduler.pipe(player).on('data', function(data){
  // data: id, event (start or stop), time, position, args
  if (data.event == 'start'){
    synth.triggerOn(data.args[0], data.time)
    console.log('start', data.args[0])
  } else if (data.event == 'stop'){
    synth.triggerOff(data.args[0], data.time)
    console.log('end', data.args[0])
  }
})