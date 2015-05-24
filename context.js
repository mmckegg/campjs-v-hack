var audioContext = new AudioContext()
var Bopper = require('bopper')

module.exports = {
  nodes: {
    slot: require('audio-slot'),

    source: {
      sample: require('audio-slot/sources/sample'),
      oscillator: require('audio-slot/sources/oscillator')
    },

    processor: {
      gain: require('audio-slot/processors/gain'),
      filter: require('audio-slot/processors/filter'),
      delay: require('audio-slot/processors/delay'),
      dipper: require('audio-slot/processors/dipper'),
      overdrive: require('audio-slot/processors/overdrive'),
      pitchshift: require('audio-slot/processors/pitchshift'),
      reverb: require('audio-slot/processors/reverb')
    },

    modulator: {
      lfo: require('audio-slot/modulators/lfo'),
      adsr: require('audio-slot/modulators/envelope'),
      param: require('audio-slot/modulators/param'),
      scale: require('audio-slot/modulators/scale'),
      value: require('audio-slot/modulators/value')
    }
  },

  scheduler: Bopper(audioContext),
  output: audioContext.destination,
  audio: audioContext
}