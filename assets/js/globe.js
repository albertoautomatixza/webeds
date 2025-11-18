import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@0.6.3/dist/cobe.esm.js';

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 20000,
  mapBrightness: 2.5,
  baseColor: [0.98, 0.8, 0.13],
  markerColor: [1, 1, 1],
  glowColor: [0.98, 0.8, 0.13],
  opacity: 0.6,
  markers: [
    { location: [19.4326, -99.1332], size: 0.08 },
    { location: [40.7128, -74.006], size: 0.09 },
    { location: [34.0522, -118.2437], size: 0.07 },
    { location: [51.5074, -0.1278], size: 0.08 },
    { location: [48.8566, 2.3522], size: 0.07 },
    { location: [52.520008, 13.404954], size: 0.06 },
    { location: [35.6762, 139.6503], size: 0.08 },
    { location: [37.5665, 126.978], size: 0.06 },
    { location: [39.9042, 116.4074], size: 0.09 },
    { location: [31.2304, 121.4737], size: 0.07 },
    { location: [1.3521, 103.8198], size: 0.07 },
    { location: [19.076, 72.8777], size: 0.07 },
    { location: [28.6139, 77.209], size: 0.06 },
    { location: [-23.5505, -46.6333], size: 0.08 },
    { location: [-33.8688, 151.2093], size: 0.07 },
    { location: [25.2048, 55.2708], size: 0.06 },
  ],
};

const initGlobe = () => {
  const canvas = document.getElementById('hero-globe');
  if (!canvas) return;

  let phi = 0;
  let width = 0;
  let isHovering = false;

  const resize = () => {
    width = canvas.offsetWidth || GLOBE_CONFIG.width / 2;
  };

  const handlePointerEnter = () => {
    isHovering = true;
    canvas.style.cursor = 'grab';
  };

  const handlePointerLeave = () => {
    isHovering = false;
    canvas.style.cursor = 'default';
  };

  resize();
  window.addEventListener('resize', resize);

  const globe = createGlobe(canvas, {
    ...GLOBE_CONFIG,
    width: width * 2,
    height: width * 2,
    onRender: (state) => {
      if (!isHovering) {
        phi += 0.005;
      }
      state.phi = phi;
      state.width = width * 2;
      state.height = width * 2;
    },
  });

  canvas.addEventListener('pointerenter', handlePointerEnter);
  canvas.addEventListener('pointerleave', handlePointerLeave);

  setTimeout(() => {
    canvas.style.opacity = '1';
  }, 100);

  return () => {
    globe.destroy();
    window.removeEventListener('resize', resize);
    canvas.removeEventListener('pointerenter', handlePointerEnter);
    canvas.removeEventListener('pointerleave', handlePointerLeave);
  };
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobe, { once: true });
} else {
  initGlobe();
}
