(function() {
  'use strict';

  function initRobot() {
    const canvas = document.getElementById('robotCanvas');

    if (!canvas || typeof THREE === 'undefined') {
      console.error('Canvas or THREE.js not available');
      return;
    }

    const scene = new THREE.Scene();
    scene.background = null;

    const container = canvas.parentElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 120);
    camera.position.set(8.2, 5.2, 9.8);
    camera.lookAt(0.25, 2.2, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffd54f, 0.22);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfacc15, 0.6);
    keyLight.position.set(8, 10, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfacc15, 0.26);
    fillLight.position.set(-5, 4, -7);
    scene.add(fillLight);

    const meshMaterial = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      wireframe: true,
      transparent: true,
      opacity: 0.34
    });

    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.35, 7.2, 7, 1, 6), meshMaterial);
    basePlate.position.y = -0.15;
    machineGroup.add(basePlate);

    const rearWall = new THREE.Mesh(new THREE.BoxGeometry(8.5, 5.5, 0.25, 7, 6, 1), meshMaterial);
    rearWall.position.set(0, 2.55, -3.45);
    machineGroup.add(rearWall);

    const sideFrameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.35, 5.7, 7.2, 1, 6, 6), meshMaterial);
    sideFrameLeft.position.set(-4.05, 2.65, 0);
    machineGroup.add(sideFrameLeft);

    const sideFrameRight = sideFrameLeft.clone();
    sideFrameRight.position.x = 4.05;
    machineGroup.add(sideFrameRight);

    const topBridge = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.45, 2.2, 7, 1, 3), meshMaterial);
    topBridge.position.set(0, 5.25, -0.95);
    machineGroup.add(topBridge);

    const workZoneFrame = new THREE.Mesh(new THREE.BoxGeometry(7.4, 4.5, 6.2, 6, 5, 5), meshMaterial);
    workZoneFrame.position.set(0, 2.2, 0);
    machineGroup.add(workZoneFrame);

    const trunnionBase = new THREE.Group();
    trunnionBase.position.set(0, 0.25, 1.1);
    machineGroup.add(trunnionBase);

    const rotaryBed = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.05, 0.48, 40, 3), meshMaterial);
    rotaryBed.position.y = 0.3;
    trunnionBase.add(rotaryBed);

    const supportLeft = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.9, 1.4, 3, 4, 3), meshMaterial);
    supportLeft.position.set(-1.95, 1.1, 0);
    trunnionBase.add(supportLeft);

    const supportRight = supportLeft.clone();
    supportRight.position.x = 1.95;
    trunnionBase.add(supportRight);

    const aAxisGroup = new THREE.Group();
    aAxisGroup.position.set(0, 1.15, 0);
    trunnionBase.add(aAxisGroup);

    const cradle = new THREE.Mesh(new THREE.CylinderGeometry(1.62, 1.62, 2.8, 34, 4, true), meshMaterial);
    cradle.rotation.z = Math.PI / 2;
    aAxisGroup.add(cradle);

    const cAxisGroup = new THREE.Group();
    cAxisGroup.position.set(0, 0, 0);
    aAxisGroup.add(cAxisGroup);

    const platter = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.52, 36, 2), meshMaterial);
    platter.rotation.x = Math.PI / 2;
    cAxisGroup.add(platter);

    const chuck = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.72, 0.95, 32, 2), meshMaterial);
    chuck.position.z = 0.72;
    chuck.rotation.x = Math.PI / 2;
    cAxisGroup.add(chuck);

    const workpieceGroup = new THREE.Group();
    workpieceGroup.position.set(0, 0, 1.36);
    cAxisGroup.add(workpieceGroup);

    const workpieceBody = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.86, 1.72, 26, 12), meshMaterial);
    workpieceBody.rotation.x = Math.PI / 2;
    workpieceGroup.add(workpieceBody);

    const workpieceTip = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.55, 24, 4), meshMaterial);
    workpieceTip.position.z = 1.08;
    workpieceTip.rotation.x = Math.PI / 2;
    workpieceGroup.add(workpieceTip);

    const xAxisGroup = new THREE.Group();
    xAxisGroup.position.set(0, 4.7, 0.25);
    machineGroup.add(xAxisGroup);

    const gantryRail = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.42, 0.82, 6, 1, 2), meshMaterial);
    xAxisGroup.add(gantryRail);

    const yAxisGroup = new THREE.Group();
    yAxisGroup.position.set(0, -0.7, 0.05);
    xAxisGroup.add(yAxisGroup);

    const carriage = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.2, 1.12, 3, 3, 3), meshMaterial);
    yAxisGroup.add(carriage);

    const zAxisGroup = new THREE.Group();
    zAxisGroup.position.set(0, -0.75, 0);
    yAxisGroup.add(zAxisGroup);

    const spindleHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.7, 2.05, 28, 8), meshMaterial);
    spindleHousing.rotation.z = Math.PI / 2;
    zAxisGroup.add(spindleHousing);

    const bAxisGroup = new THREE.Group();
    bAxisGroup.position.set(1.02, 0, 0);
    zAxisGroup.add(bAxisGroup);

    const spindleNose = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.32, 0.75, 24, 4), meshMaterial);
    spindleNose.rotation.z = Math.PI / 2;
    bAxisGroup.add(spindleNose);

    const toolGroup = new THREE.Group();
    toolGroup.position.set(0.48, 0, 0);
    bAxisGroup.add(toolGroup);

    const toolBody = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.11, 0.86, 20, 4), meshMaterial);
    toolBody.rotation.z = Math.PI / 2;
    toolGroup.add(toolBody);

    const toolTip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.28, 18, 4), meshMaterial);
    toolTip.position.x = 0.58;
    toolTip.rotation.z = -Math.PI / 2;
    toolGroup.add(toolTip);

    const traceGroup = new THREE.Group();
    workpieceGroup.add(traceGroup);

    for (let i = 0; i < 4; i++) {
      const trace = new THREE.Mesh(new THREE.TorusGeometry(0.52 + i * 0.11, 0.016, 8, 56), meshMaterial);
      trace.rotation.y = Math.PI / 2;
      trace.position.z = -0.05 + i * 0.22;
      traceGroup.add(trace);
    }

    machineGroup.rotation.y = -0.48;
    machineGroup.scale.set(0.78, 0.78, 0.78);

    let isHovered = false;
    let motionBlend = 0.45;
    let time = 0;

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    function animate() {
      requestAnimationFrame(animate);

      time += 0.01;
      motionBlend += (isHovered ? 1 : 0.45 - motionBlend) * 0.05;

      const feed = time * 0.9;

      cAxisGroup.rotation.z += 0.015 * motionBlend;
      aAxisGroup.rotation.x = Math.sin(feed * 0.45) * 0.34 * motionBlend;

      xAxisGroup.position.x = Math.sin(feed * 0.52) * 1.35 * motionBlend;
      yAxisGroup.position.y = -0.7 + Math.cos(feed * 0.8 + 1.1) * 0.42 * motionBlend;
      zAxisGroup.position.z = Math.sin(feed * 0.95 + 2.2) * 0.48 * motionBlend;

      bAxisGroup.rotation.y = -0.32 + Math.sin(feed * 0.7 + 0.9) * 0.52 * motionBlend;
      bAxisGroup.rotation.z = Math.cos(feed * 0.6) * 0.28 * motionBlend;

      const shaping = 1 + Math.sin(feed * 1.8) * 0.04 * motionBlend;
      workpieceBody.scale.set(shaping, 1, 1 - (shaping - 1) * 0.8);

      traceGroup.children.forEach((trace, index) => {
        trace.rotation.z = feed * (0.22 + index * 0.04);
        trace.scale.setScalar(0.95 + Math.sin(feed * 2 + index) * 0.03 * motionBlend);
      });

      meshMaterial.opacity = 0.3 + Math.sin(feed * 1.4) * 0.05;
      machineGroup.rotation.y = -0.48 + Math.sin(feed * 0.23) * 0.05;

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      const nextWidth = container.offsetWidth;
      const nextHeight = container.offsetHeight;

      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      canvas.style.opacity = '1';
    }, 120);

    return () => {
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRobot);
  } else {
    setTimeout(initRobot, 100);
  }
})();
