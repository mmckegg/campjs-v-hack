precision mediump float;

uniform vec2 resolution;
uniform sampler2D prev;
uniform sampler2D wavf;
uniform float time;
uniform vec2 mouse;

vec3 tex(vec2 uv) {
  return texture2D(prev, uv).rgb;
}

#pragma glslify: noise = require('glsl-noise/simplex/3d')
#pragma glslify: blur  = require('glsl-hash-blur', sample=tex, iterations=20)

void main() {
  float speed = 0.2;

  vec2 uv    = gl_FragCoord.xy / resolution.xy;
  vec2 offset = vec2(
    noise(vec3(uv * (2.0 + mouse.y * 7.0), time * speed) + vec3(109.38)),
    noise(vec3(uv * (2.0 + mouse.y * 7.0), time * speed) + vec3(309.38))
  ) * 0.005;

  vec2 buv = uv;
  buv = buv * 2.0 - 1.0;
  buv *= 0.99;
  buv = buv * 0.5 + 0.5;

  vec3 color = blur(buv + offset, 4.0 / resolution.x, resolution.x / resolution.y);// texture2D(prev, buv + offset);
  vec4 wave  = texture2D(wavf, uv);

  color.rgb = max(vec3(0.0), color.rgb - 0.008);
  color.rgb += wave.rgb * 2.0;

  gl_FragColor = vec4(color.rgb, 1);
}
