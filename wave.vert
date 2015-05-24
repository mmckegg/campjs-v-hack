precision mediump float;

attribute float wavePos;

uniform sampler2D audio;

#pragma glslify: analyse = require('gl-audio-analyser')

void main() {
  gl_Position = vec4(
    wavePos * 2.0 - 1.0,
    analyse(audio, wavePos),
    1, 1
  );
}
