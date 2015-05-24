precision mediump float;

#pragma glslify: hsl2rgb = require('glsl-hsl2rgb')

uniform vec2 mouse;

void main() {
  gl_FragColor = vec4(hsl2rgb(mouse.x * 1.0, 0.9, 0.4), 1);
}
