(function() {
  'use strict';

  const GLOBE_CONFIG = {
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

  function initGlobe() {
    const canvas = document.getElementById('hero-globe');

    if (!canvas) {
      console.error('Canvas element #hero-globe not found');
      return;
    }

    if (typeof COBE === 'undefined') {
      console.error('COBE library not loaded. Make sure the script is included before globe.js');
      return;
    }

    console.log('Initializing globe...');

    let phi = 0;
    let width = 0;

    const onResize = () => {
      width = canvas.offsetWidth;
    };

    window.addEventListener('resize', onResize);
    onResize();

    const globe = COBE.default(canvas, {
      ...GLOBE_CONFIG,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        phi += 0.005;
        state.phi = phi;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    setTimeout(() => {
      canvas.style.opacity = '1';
      console.log('Globe initialized and visible');
    }, 100);

    return globe;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobe);
  } else {
    initGlobe();
  }
})();
