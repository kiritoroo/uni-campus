precision highp float;

uniform float uTime;

varying vec2 vUv;

float randomv2(vec2 c) {
  return fract(sin(dot(c.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

const vec3 rgb1 = vec3(249.0 / 255.0, 244.0 / 255.0, 250.0 / 255.0);
const vec3 rgb2 = vec3(139.0 / 255.0, 167.0 / 255.0, 204.0 / 255.0);

void main() {
  vec3 rgb = mix(rgb1, rgb2, vUv.y * 1.8 - 1.0);

  gl_FragColor = vec4(rgb, 1.0);
}