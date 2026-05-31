import * as THREE from 'three';

export function initScene(canvas: HTMLCanvasElement) {
  let renderer: THREE.WebGLRenderer;

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, failIfMajorPerformanceCaveat: false });
  } catch (e) {
    console.warn('WebGL non disponible', e);
    return () => {};
  }

  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      void main() {
        vec2 uv = vUv;
        float n = smoothNoise(uv * 4.0 + uTime * 0.2);
        float r = sin(uv.x * 3.0 + uTime * 0.8 + n * 2.0) * 0.5 + 0.5;
        float g = sin(uv.y * 3.0 + uTime * 0.6 + n * 2.0 + 2.0) * 0.5 + 0.5;
        float b = sin((uv.x + uv.y) * 3.0 + uTime * 0.4 + n * 2.0 + 4.0) * 0.5 + 0.5;
        vec3 color = vec3(r, g, b) * 0.6;
        gl_FragColor = vec4(color, 0.7);
      }
    `,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let rafId: number;

  const animate = () => {
    rafId = requestAnimationFrame(animate);
    material.uniforms.uTime.value += 0.03;
    renderer.render(scene, camera);
  };
  animate();

  const observer = new ResizeObserver(() => {
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  observer.observe(canvas);

  return () => {
    cancelAnimationFrame(rafId);
    observer.disconnect();
    renderer.dispose();
  };
}