varying vec2 vUv;
uniform float time;
uniform sampler2D uTexture;

void main() {
 
  vec2 uv = vUv;

  uv.x += sin(uv.y * 0.15);

  vec2 repeat = vec2(5.0, 10.0);
  
  uv = fract(uv * repeat + vec2(0.0, time / 2.));
  
  vec4 color = texture2D(uTexture, uv);
  
  gl_FragColor = color;
}
