import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@0.6.3/dist/cobe.esm.js';

const HERO_GLOBE_MARKERS = [
  { location: [19.4326, -99.1332], size: 0.08 },
  { location: [20.6597, -103.3496], size: 0.07 },
  { location: [40.7128, -74.006], size: 0.08 },
  { location: [52.52, 13.405], size: 0.05 },
  { location: [35.6762, 139.6503], size: 0.04 },
  { location: [23.6345, -102.5528], size: 0.05 },
  { location: [14.5995, 120.9842], size: 0.04 },
];

const initHeroGlobe = () => {
  const canvas = document.getElementById('hero-globe');
  if (!canvas) return;

  let rotation = 0;
  let width = 0;

  const updateSize = () => {
    width = canvas.offsetWidth || canvas.clientWidth || 0;
  };

  updateSize();
  window.addEventListener('resize', updateSize);

  createGlobe(canvas, {
    devicePixelRatio: 2,
    width: (width || 300) * 2,
    height: (width || 300) * 2,
    phi: 0,
    theta: 0.35,
    dark: 1,
    diffuse: 0.7,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [0.9, 0.92, 0.95],
    glowColor: [1, 0.92, 0.6],
    markerColor: [250 / 255, 209 / 255, 33 / 255],
    markers: HERO_GLOBE_MARKERS,
    onRender: (state) => {
      rotation += 0.0025;
      state.phi = rotation;
      state.theta = 0.35;
      state.width = (width || 300) * 2;
      state.height = (width || 300) * 2;
    },
  });

  requestAnimationFrame(() => {
    canvas.style.opacity = '1';
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroGlobe, { once: true });
} else {
  initHeroGlobe();
}
