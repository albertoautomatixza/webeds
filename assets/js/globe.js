import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@0.6.3/dist/cobe.esm.js';

const MOVEMENT_DAMPING = 1800;
const AUTO_ROTATION_SPEED = 0.0025;

const HERO_GLOBE_CONFIG = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.12, 0.12, 0.16],
  mapColor: [0.52, 0.54, 0.58],
  markerColor: [250 / 255, 220 / 255, 82 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [19.4326, -99.1332], size: 0.12 },
    { location: [34.6937, 135.5022], size: 0.06 },
    { location: [14.5995, 120.9842], size: 0.05 },
    { location: [19.076, 72.8777], size: 0.08 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.06 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.08 },
    { location: [40.7128, -74.006], size: 0.08 },
    { location: [41.0082, 28.9784], size: 0.05 },
  ],
};

const initHeroGlobe = () => {
  const canvas = document.getElementById('hero-globe');
  if (!canvas) return;

  let width = 0;
  let rotation = 0;
  let pointerActive = false;
  let lastPointerX = 0;
  let dragOffset = 0;

  const resize = () => {
    width = canvas.offsetWidth || HERO_GLOBE_CONFIG.width / 2;
  };

  const startPointer = (clientX) => {
    pointerActive = true;
    lastPointerX = clientX;
    canvas.style.cursor = 'grabbing';
  };

  const stopPointer = () => {
    pointerActive = false;
    canvas.style.cursor = 'grab';
  };

  const movePointer = (clientX) => {
    if (!pointerActive) return;
    const delta = clientX - lastPointerX;
    dragOffset += delta / MOVEMENT_DAMPING;
    lastPointerX = clientX;
  };

  resize();
  window.addEventListener('resize', resize);

  createGlobe(canvas, {
    ...HERO_GLOBE_CONFIG,
    width: (width || HERO_GLOBE_CONFIG.width) * 2,
    height: (width || HERO_GLOBE_CONFIG.height) * 2,
    onRender: (state) => {
      rotation += AUTO_ROTATION_SPEED;
      dragOffset *= 0.92;

      state.phi = rotation + dragOffset;
      state.theta = HERO_GLOBE_CONFIG.theta;
      state.width = (width || HERO_GLOBE_CONFIG.width) * 2;
      state.height = (width || HERO_GLOBE_CONFIG.height) * 2;
    },
  });

  canvas.style.cursor = 'grab';

  canvas.addEventListener('pointerdown', (event) => startPointer(event.clientX));
  window.addEventListener('pointerup', stopPointer);
  window.addEventListener('pointerleave', stopPointer);
  window.addEventListener('pointermove', (event) => movePointer(event.clientX));

  canvas.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.touches && event.touches[0];
      if (!touch) return;
      startPointer(touch.clientX);
    },
    { passive: true }
  );

  window.addEventListener(
    'touchend',
    () => {
      stopPointer();
    },
    { passive: true }
  );

  window.addEventListener(
    'touchmove',
    (event) => {
      const touch = event.touches && event.touches[0];
      if (touch) {
        movePointer(touch.clientX);
      }
    },
    { passive: true }
  );

  requestAnimationFrame(() => {
    canvas.style.opacity = '1';
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroGlobe, { once: true });
} else {
  initHeroGlobe();
}
