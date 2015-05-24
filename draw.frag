precision mediump float;

uniform vec2 resolution;
uniform sampler2D curr;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 color = texture2D(curr, uv);

  gl_FragColor = vec4(color.rgba);
}
