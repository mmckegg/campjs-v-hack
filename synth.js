var ScaleChunk = require('loop-drop-setup/scale-chunk')


module.exports = function(context) {
  var synth = ScaleChunk(context)

  synth.set({
    node: "scaleChunk",
    shape: [ 36, 1 ],
    slots: [
      {
        id: "output",
        processors: [
          {
            node: "processor/overdrive",
            gain: 15.0926,
            postCut: 28362.939944060865,
            color: 5200,
            band: 1.280884595831215,
            preBand: 0.5,
            amp: 1
          },
          {
            node: "processor/reverb",
            feedback: 11.018190861216683,
            time: 0.5206257768966754,
            reverse: true,
            dry: 0.8103,
            wet: 0.3647,
            cutoff: 2824.7821402991567,
            filterType: "lowpass"
          },
          {
            node: "processor/filter",
            frequency: 70.25682822639112,
            type: "peaking",
            gain: 11.67033316719239,
            Q: 1.288011047793844
          },
          {
            node: "processor/overdrive",
            gain: 3.6899,
            color: 6865.828844861264,
            band: 1.2814869522402756,
            postCut: 5967.377284402579
          },
          {
            node: "processor/filter",
            frequency: 475,
            Q: 1,
            gain: 0,
            type: "highpass"
          }
        ],
        volume: 1.7214,
        node: "slot",
        noteOffset: 0
      }
    ],
    outputs: [ "output" ],
    color: [ 100, 78, 217 ],
    selectedSlotId: "$template",
    scale: { notes: [ 0, 2, 4, 5, 7, 9, 11 ], offset: 3 },
    templateSlot: {
      sources: [
        {
          node: "source/oscillator",
          amp: 0.2852,
          frequency: 439.99999999999955,
          octave: -2,
          noteOffset: 0,
          detune: 0,
          shape: "sine"
        },
        {
          node: "source/oscillator",
          amp: 0.4556,
          frequency: 440,
          shape: "square",
          octave: -3,
          noteOffset: 0,
          detune: 0
        },
        {
          node: "source/oscillator",
          amp: 0.2543,
          frequency: 440,
          octave: -2,
          noteOffset: 0,
          detune: 0,
          shape: "sine"
        }
      ],
      processors: [
        {
          node: "processor/filter",
          frequency: {
            node: "modulator/adsr",
            value: 2095.7252237459784,
            attack: 0,
            sustain: 0.06265189209028826,
            decay: 0.21366832451766052,
            release: 0,
            endValue: 0.05002855468137742
          }
        },
        {
          node: "processor/filter",
          frequency: 501.2563873893572,
          type: "highshelf",
          gain: -9.386628038567743
        },
        {
          node: "processor/gain",
          gain: {
            node: "modulator/adsr",
            release: 0.873,
            value: 1,
            decay: 0.582,
            sustain: 0.000528271608051045
          }
        }
      ],
      volume: 0.5891,
      id: { $param: "id" },
      noteOffset: {
        node: "modulator/scale",
        value: { $param: "value" },
        offset: { $param: "offset" },
        scale: { $param: "scale" }
      },
      output: "output",
      node: "slot"
    },
    routes: { output: "$default" },
    offset: 0,
    volume: 1,
    chokeAll: false
  })

  return synth
}
