import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@0.6.3/dist/cobe.esm.js';

const MOVEMENT_DAMPING = 1400;

const HERO_GLOBE_CONFIG = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

const initHeroGlobe = () => {
  const canvas = document.getElementById('hero-globe');
  if (!canvas) return;

  let phi = 0;
  let width = 0;
  let pointerInteracting = null;

  const resize = () => {
    width = canvas.offsetWidth || canvas.clientWidth || 0;
  };

  const updatePointerInteraction = (value) => {
    pointerInteracting = value;
    canvas.style.cursor = value !== null ? 'grabbing' : 'grab';
  };

  const handlePointerMove = (clientX) => {
    if (pointerInteracting === null) return;
    const delta = clientX - pointerInteracting;
    phi += delta / MOVEMENT_DAMPING;
    updatePointerInteraction(clientX);
  };

  resize();
  window.addEventListener('resize', resize);

  createGlobe(canvas, {
    ...HERO_GLOBE_CONFIG,
    width: (width || HERO_GLOBE_CONFIG.width) * 2,
    height: (width || HERO_GLOBE_CONFIG.height) * 2,
    onRender: (state) => {
      if (pointerInteracting === null) {
        phi += 0.005;
      }

      state.phi = phi;
      state.theta = HERO_GLOBE_CONFIG.theta;
      state.width = (width || HERO_GLOBE_CONFIG.width) * 2;
      state.height = (width || HERO_GLOBE_CONFIG.height) * 2;
    },
  });

  canvas.addEventListener('pointerdown', (event) => {
    updatePointerInteraction(event.clientX);
  });

  window.addEventListener('pointerup', () => updatePointerInteraction(null));
  window.addEventListener('pointerout', () => updatePointerInteraction(null));

  window.addEventListener('pointermove', (event) => handlePointerMove(event.clientX));
  window.addEventListener('touchmove', (event) => {
    if (event.touches && event.touches[0]) {
      handlePointerMove(event.touches[0].clientX);
    }
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
