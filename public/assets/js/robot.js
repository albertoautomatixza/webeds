(function() {
  'use strict';

  function initRobot() {
    const canvas = document.getElementById("robotCanvas");

    if (!canvas || typeof THREE === 'undefined') {
      console.error('Canvas or THREE.js not available');
      return;
    }

    const scene = new THREE.Scene();
    scene.background = null;

    const container = canvas.parentElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(5, 3, 6);
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfacc15, 0.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfacc15, 0.35);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);

    const meshMaterial = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    const cncGroup = new THREE.Group();
    scene.add(cncGroup);

    const baseGeo = new THREE.BoxGeometry(3.5, 0.25, 2.5, 8, 2, 6);
    const base = new THREE.Mesh(baseGeo, meshMaterial);
    base.position.y = 0.125;
    cncGroup.add(base);

    const leftColumnGeo = new THREE.BoxGeometry(0.35, 2.8, 0.35, 3, 10, 3);
    const leftColumn = new THREE.Mesh(leftColumnGeo, meshMaterial);
    leftColumn.position.set(-1.4, 1.65, -1);
    cncGroup.add(leftColumn);

    const rightColumnGeo = new THREE.BoxGeometry(0.35, 2.8, 0.35, 3, 10, 3);
    const rightColumn = new THREE.Mesh(rightColumnGeo, meshMaterial);
    rightColumn.position.set(1.4, 1.65, -1);
    cncGroup.add(rightColumn);

    const topBeamGeo = new THREE.BoxGeometry(3.2, 0.3, 0.4, 10, 2, 3);
    const topBeam = new THREE.Mesh(topBeamGeo, meshMaterial);
    topBeam.position.set(0, 3.05, -1);
    cncGroup.add(topBeam);

    const xAxisGroup = new THREE.Group();
    xAxisGroup.position.set(0, 3.05, -1);
    cncGroup.add(xAxisGroup);

    const xCarriageGeo = new THREE.BoxGeometry(0.5, 0.45, 0.55, 4, 3, 4);
    const xCarriage = new THREE.Mesh(xCarriageGeo, meshMaterial);
    xAxisGroup.add(xCarriage);

    const yAxisGroup = new THREE.Group();
    yAxisGroup.position.y = -0.4;
    xAxisGroup.add(yAxisGroup);

    const yCarriageGeo = new THREE.BoxGeometry(0.4, 1.2, 0.45, 3, 6, 3);
    const yCarriage = new THREE.Mesh(yCarriageGeo, meshMaterial);
    yCarriage.position.y = -0.6;
    yAxisGroup.add(yCarriage);

    const zAxisGroup = new THREE.Group();
    zAxisGroup.position.y = -1.2;
    yAxisGroup.add(zAxisGroup);

    const zHousingGeo = new THREE.BoxGeometry(0.35, 0.5, 0.4, 3, 4, 3);
    const zHousing = new THREE.Mesh(zHousingGeo, meshMaterial);
    yAxisGroup.add(zHousingGeo);

    const spindleGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.9, 20, 8);
    const spindle = new THREE.Mesh(spindleGeo, meshMaterial);
    spindle.position.y = -0.7;
    zAxisGroup.add(spindle);

    const spindleHeadGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.2, 20, 2);
    const spindleHead = new THREE.Mesh(spindleHeadGeo, meshMaterial);
    spindleHead.position.y = -0.55;
    zAxisGroup.add(spindleHead);

    const toolHolderGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 16, 3);
    const toolHolder = new THREE.Mesh(toolHolderGeo, meshMaterial);
    toolHolder.position.y = -1.3;
    zAxisGroup.add(toolHolder);

    const cuttingToolGeo = new THREE.ConeGeometry(0.06, 0.25, 16, 4);
    const cuttingTool = new THREE.Mesh(cuttingToolGeo, meshMaterial);
    cuttingTool.position.y = -1.575;
    zAxisGroup.add(cuttingTool);

    const rotaryTableGroup = new THREE.Group();
    rotaryTableGroup.position.set(0, 0.5, 0.3);
    cncGroup.add(rotaryTableGroup);

    const rotaryBaseGeo = new THREE.CylinderGeometry(0.8, 0.85, 0.25, 32, 2);
    const rotaryBase = new THREE.Mesh(rotaryBaseGeo, meshMaterial);
    rotaryTableGroup.add(rotaryBase);

    const rotaryTopGeo = new THREE.CylinderGeometry(0.75, 0.78, 0.15, 32, 2);
    const rotaryTop = new THREE.Mesh(rotaryTopGeo, meshMaterial);
    rotaryTop.position.y = 0.2;
    rotaryTableGroup.add(rotaryTop);

    const tiltAxisGroup = new THREE.Group();
    tiltAxisGroup.position.y = 0.35;
    rotaryTableGroup.add(tiltAxisGroup);

    const tiltHousingGeo = new THREE.BoxGeometry(0.9, 0.3, 0.6, 5, 2, 4);
    const tiltHousing = new THREE.Mesh(tiltHousingGeo, meshMaterial);
    tiltAxisGroup.add(tiltHousing);

    const workpieceGroup = new THREE.Group();
    workpieceGroup.position.y = 0.25;
    tiltAxisGroup.add(workpieceGroup);

    const workpieceGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.6, 24, 8);
    const workpiece = new THREE.Mesh(workpieceGeo, meshMaterial);
    workpiece.rotation.x = Math.PI / 2;
    workpieceGroup.add(workpiece);

    const workpieceDetail1Geo = new THREE.TorusGeometry(0.25, 0.08, 12, 24);
    const workpieceDetail1 = new THREE.Mesh(workpieceDetail1Geo, meshMaterial);
    workpieceDetail1.rotation.y = Math.PI / 2;
    workpieceGroup.add(workpieceDetail1);

    const workpieceDetail2Geo = new THREE.ConeGeometry(0.2, 0.35, 20, 6);
    const workpieceDetail2 = new THREE.Mesh(workpieceDetail2Geo, meshMaterial);
    workpieceDetail2.rotation.z = Math.PI / 2;
    workpieceDetail2.position.x = 0.3;
    workpieceGroup.add(workpieceDetail2);

    for (let i = 0; i < 3; i++) {
      const railGeo = new THREE.BoxGeometry(3.2, 0.08, 0.08, 12, 1, 1);
      const rail = new THREE.Mesh(railGeo, meshMaterial);
      rail.position.set(0, 3.15 + i * 0.1, -1.15);
      cncGroup.add(rail);
    }

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * 0.7;
      const z = Math.sin(angle) * 0.7;
      const boltGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.06, 8, 1);
      const bolt = new THREE.Mesh(boltGeo, meshMaterial);
      bolt.position.set(x, 0.53, z + 0.3);
      cncGroup.add(bolt);
    }

    cncGroup.scale.set(0.5, 0.5, 0.5);
    cncGroup.position.set(0, 0.2, 0);

    let isHovered = false;
    let time = 0;
    let animProgress = 0;

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

      if (isHovered) {
        animProgress = Math.min(animProgress + 0.015, 1);
      } else {
        animProgress = Math.max(animProgress - 0.01, 0);
      }

      xAxisGroup.position.x = Math.sin(time * 0.6) * 0.8 * animProgress;

      yCarriage.position.y = -0.6 + Math.sin(time * 0.5 + 1) * 0.3 * animProgress;

      zAxisGroup.position.y = -1.2 + Math.sin(time * 0.7 + 2) * 0.25 * animProgress;

      rotaryTableGroup.rotation.y += 0.008 * animProgress;

      tiltAxisGroup.rotation.x = Math.sin(time * 0.4) * 0.3 * animProgress;

      spindle.rotation.y += 0.15 * animProgress;
      spindleHead.rotation.y += 0.15 * animProgress;
      toolHolder.rotation.y += 0.15 * animProgress;
      cuttingTool.rotation.y += 0.15 * animProgress;

      workpiece.rotation.z += 0.01 * animProgress;

      meshMaterial.opacity = 0.32 + Math.sin(time * 1.8) * 0.06;

      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      canvas.style.opacity = '1';
    }, 100);

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
