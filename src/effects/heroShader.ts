export const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

/* Dithered contour field lit by a flashlight. Every fragment ends as pure
   BG or PAPER: brightness falloff is expressed as dot density, never grey.
   u_out (0..1) dissolves the image in Bayer order by dropping fragment alpha;
   the hero renders on an opaque canvas and leaves it at 0. */
export const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_light;
uniform float u_radius;
uniform float u_base;
uniform float u_out;

const vec3 BG = vec3(0.059, 0.059, 0.055);
const vec3 PAPER = vec3(0.922, 0.906, 0.863);

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

/* Recursive Bayer without bit ops (WebGL1 safe). Values in [0, 1). */
float b2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float b4(vec2 a) { return b2(0.5 * a) * 0.25 + b2(a); }
float b8(vec2 a) { return b4(0.5 * a) * 0.25 + b2(a); }

void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 uv = (px - 0.5 * u_res) / u_res.y;
  float t = u_time;

  vec2 w = 0.35 * vec2(noise(uv * 1.5 + t * 0.05), noise(uv * 1.5 - t * 0.05 + 3.1));
  float n = fbm(uv * 2.2 + w);
  float c = abs(fract(n * 9.0) - 0.5) * 2.0;
  float line = smoothstep(0.86, 1.0, c);
  float shade = 0.12 * n + 0.88 * line;

  float d = distance(px, u_light);
  float core = pow(1.0 - clamp(d / u_radius, 0.0, 1.0), 1.8);
  float halo = 0.045 * (1.0 - clamp(d / (u_radius * 2.0), 0.0, 1.0));
  float light = min(1.0, core + halo);
  float v = shade * (u_base + (1.0 - u_base) * light);

  float on = step(b8(px), v);
  float keep = step(u_out, b8(px + vec2(3.0, 5.0)));
  gl_FragColor = vec4(mix(BG, PAPER, on) * keep, keep);
}
`;
