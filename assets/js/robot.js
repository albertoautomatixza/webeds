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

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2, 3, 10);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfacc15, 0.6);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfacc15, 0.4);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);

    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0xfacc15,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.45
    });

    const detailMaterial = new THREE.LineBasicMaterial({
      color: 0xfacc15,
      linewidth: 1,
      transparent: true,
      opacity: 0.3
    });

    function createWireframeFromGeometry(geometry, material = edgesMaterial) {
      const edges = new THREE.EdgesGeometry(geometry);
      return new THREE.LineSegments(edges, material);
    }

    function createDetailCircle(radius, segments = 8) {
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return new THREE.Line(geometry, detailMaterial);
    }

    const armGroup = new THREE.Group();
    scene.add(armGroup);

    const baseGroup = new THREE.Group();
    armGroup.add(baseGroup);

    const baseCylGeo = new THREE.CylinderGeometry(1.2, 1.5, 0.6, 32);
    const baseWire = createWireframeFromGeometry(baseCylGeo);
    baseGroup.add(baseWire);

    const baseTopRingGeo = new THREE.TorusGeometry(1.2, 0.1, 16, 32);
    const baseTopRing = createWireframeFromGeometry(baseTopRingGeo);
    baseTopRing.rotation.x = Math.PI / 2;
    baseTopRing.position.y = 0.3;
    baseGroup.add(baseTopRing);

    const baseBottomRingGeo = new THREE.TorusGeometry(1.5, 0.08, 16, 32);
    const baseBottomRing = createWireframeFromGeometry(baseBottomRingGeo);
    baseBottomRing.rotation.x = Math.PI / 2;
    baseBottomRing.position.y = -0.3;
    baseGroup.add(baseBottomRing);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const boltGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.15, 6);
      const bolt = createWireframeFromGeometry(boltGeo, detailMaterial);
      bolt.position.x = Math.cos(angle) * 1.35;
      bolt.position.z = Math.sin(angle) * 1.35;
      bolt.position.y = -0.3;
      baseGroup.add(bolt);

      const hexGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.05, 6);
      const hex = createWireframeFromGeometry(hexGeo, detailMaterial);
      hex.position.x = Math.cos(angle) * 1.35;
      hex.position.z = Math.sin(angle) * 1.35;
      hex.position.y = -0.22;
      baseGroup.add(hex);
    }

    const joint1Group = new THREE.Group();
    joint1Group.position.y = 0.6;
    baseGroup.add(joint1Group);

    const joint1SphereGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const joint1Wire = createWireframeFromGeometry(joint1SphereGeo);
    joint1Group.add(joint1Wire);

    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(0.4, 0.025, 12, 24);
      const ring = createWireframeFromGeometry(ringGeo, detailMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = (i - 1) * 0.15;
      joint1Group.add(ring);
    }

    const segment1Group = new THREE.Group();
    segment1Group.position.y = 0.4;
    joint1Group.add(segment1Group);

    const seg1BoxGeo = new THREE.BoxGeometry(0.6, 2.5, 0.55);
    const seg1Wire = createWireframeFromGeometry(seg1BoxGeo);
    seg1Wire.position.y = 1.25;
    segment1Group.add(seg1Wire);

    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(0.32, 0.05, 12, 24);
      const ring = createWireframeFromGeometry(ringGeo);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.5 + i * 0.8;
      segment1Group.add(ring);

      for (let j = 0; j < 6; j++) {
        const angle = (j / 6) * Math.PI * 2;
        const boltGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.08, 6);
        const bolt = createWireframeFromGeometry(boltGeo, detailMaterial);
        bolt.position.x = Math.cos(angle) * 0.28;
        bolt.position.z = Math.sin(angle) * 0.28;
        bolt.position.y = 0.5 + i * 0.8;
        bolt.rotation.z = Math.PI / 2;
        segment1Group.add(bolt);
      }
    }

    for (let i = 0; i < 4; i++) {
      const cableGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.3, 8);
      const cable = createWireframeFromGeometry(cableGeo, detailMaterial);
      const angle = (i / 4) * Math.PI * 2;
      cable.position.x = Math.cos(angle) * 0.25;
      cable.position.z = Math.sin(angle) * 0.25;
      cable.position.y = 1.15;
      segment1Group.add(cable);
    }

    const joint2Group = new THREE.Group();
    joint2Group.position.y = 2.5;
    segment1Group.add(joint2Group);

    const joint2SphereGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const joint2Wire = createWireframeFromGeometry(joint2SphereGeo);
    joint2Group.add(joint2Wire);

    const joint2RingGeo = new THREE.TorusGeometry(0.38, 0.04, 12, 32);
    const joint2Ring = createWireframeFromGeometry(joint2RingGeo);
    joint2Ring.rotation.z = Math.PI / 2;
    joint2Group.add(joint2Ring);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const boltGeo = new THREE.SphereGeometry(0.04, 6, 6);
      const bolt = createWireframeFromGeometry(boltGeo, detailMaterial);
      bolt.position.x = Math.cos(angle) * 0.32;
      bolt.position.z = Math.sin(angle) * 0.32;
      joint2Group.add(bolt);
    }

    const segment2Group = new THREE.Group();
    segment2Group.position.y = 0.35;
    joint2Group.add(segment2Group);

    const seg2BoxGeo = new THREE.BoxGeometry(0.5, 2.2, 0.48);
    const seg2Wire = createWireframeFromGeometry(seg2BoxGeo);
    seg2Wire.position.y = 1.1;
    segment2Group.add(seg2Wire);

    for (let i = 0; i < 2; i++) {
      const ringGeo = new THREE.TorusGeometry(0.28, 0.04, 12, 24);
      const ring = createWireframeFromGeometry(ringGeo);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.5 + i * 1;
      segment2Group.add(ring);

      for (let j = 0; j < 5; j++) {
        const angle = (j / 5) * Math.PI * 2;
        const detailGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.06, 6);
        const detail = createWireframeFromGeometry(detailGeo, detailMaterial);
        detail.position.x = Math.cos(angle) * 0.24;
        detail.position.z = Math.sin(angle) * 0.24;
        detail.position.y = 0.5 + i * 1;
        detail.rotation.z = Math.PI / 2;
        segment2Group.add(detail);
      }
    }

    for (let i = 0; i < 3; i++) {
      const cableGeo = new THREE.CylinderGeometry(0.025, 0.025, 2, 8);
      const cable = createWireframeFromGeometry(cableGeo, detailMaterial);
      const angle = (i / 3) * Math.PI * 2;
      cable.position.x = Math.cos(angle) * 0.21;
      cable.position.z = Math.sin(angle) * 0.21;
      cable.position.y = 1;
      segment2Group.add(cable);
    }

    const joint3Group = new THREE.Group();
    joint3Group.position.y = 2.2;
    segment2Group.add(joint3Group);

    const joint3SphereGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const joint3Wire = createWireframeFromGeometry(joint3SphereGeo);
    joint3Group.add(joint3Wire);

    const joint3OuterRingGeo = new THREE.TorusGeometry(0.32, 0.03, 12, 32);
    const joint3OuterRing = createWireframeFromGeometry(joint3OuterRingGeo, detailMaterial);
    joint3OuterRing.rotation.z = Math.PI / 2;
    joint3Group.add(joint3OuterRing);

    const segment3Group = new THREE.Group();
    segment3Group.position.y = 0.3;
    joint3Group.add(segment3Group);

    const seg3BoxGeo = new THREE.BoxGeometry(0.42, 1.6, 0.4);
    const seg3Wire = createWireframeFromGeometry(seg3BoxGeo);
    seg3Wire.position.y = 0.8;
    segment3Group.add(seg3Wire);

    for (let i = 0; i < 2; i++) {
      const cableGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8);
      const cable = createWireframeFromGeometry(cableGeo, detailMaterial);
      cable.position.x = 0.15 * (i === 0 ? 1 : -1);
      cable.position.y = 0.75;
      segment3Group.add(cable);
    }

    const wristGroup = new THREE.Group();
    wristGroup.position.y = 1.6;
    segment3Group.add(wristGroup);

    const wristCylGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.35, 16);
    const wristWire = createWireframeFromGeometry(wristCylGeo);
    wristGroup.add(wristWire);

    const wristRingGeo = new THREE.TorusGeometry(0.25, 0.03, 12, 24);
    const wristRing = createWireframeFromGeometry(wristRingGeo);
    wristRing.rotation.x = Math.PI / 2;
    wristGroup.add(wristRing);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const boltGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.05, 6);
      const bolt = createWireframeFromGeometry(boltGeo, detailMaterial);
      bolt.position.x = Math.cos(angle) * 0.22;
      bolt.position.z = Math.sin(angle) * 0.22;
      wristGroup.add(bolt);
    }

    const endEffectorGroup = new THREE.Group();
    endEffectorGroup.position.y = 0.35;
    wristGroup.add(endEffectorGroup);

    const clawBaseGeo = new THREE.BoxGeometry(0.45, 0.28, 0.32);
    const clawBaseWire = createWireframeFromGeometry(clawBaseGeo);
    endEffectorGroup.add(clawBaseWire);

    for (let i = 0; i < 4; i++) {
      const detailGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 6);
      const detail = createWireframeFromGeometry(detailGeo, detailMaterial);
      detail.position.x = (i < 2 ? 0.15 : -0.15);
      detail.position.z = (i % 2 === 0 ? 0.1 : -0.1);
      detail.rotation.z = Math.PI / 2;
      endEffectorGroup.add(detail);
    }

    const claw1Geo = new THREE.BoxGeometry(0.12, 0.55, 0.15);
    const claw1Wire = createWireframeFromGeometry(claw1Geo);
    claw1Wire.position.set(0.25, -0.05, 0);
    endEffectorGroup.add(claw1Wire);

    const claw1DetailGeo = new THREE.BoxGeometry(0.08, 0.45, 0.1);
    const claw1Detail = createWireframeFromGeometry(claw1DetailGeo, detailMaterial);
    claw1Detail.position.set(0.25, -0.05, 0);
    endEffectorGroup.add(claw1Detail);

    const claw2Wire = createWireframeFromGeometry(claw1Geo);
    claw2Wire.position.set(-0.25, -0.05, 0);
    endEffectorGroup.add(claw2Wire);

    const claw2Detail = createWireframeFromGeometry(claw1DetailGeo, detailMaterial);
    claw2Detail.position.set(-0.25, -0.05, 0);
    endEffectorGroup.add(claw2Detail);

    for (let i = 0; i < 3; i++) {
      const gripGeo = new THREE.BoxGeometry(0.08, 0.03, 0.12);
      const grip1 = createWireframeFromGeometry(gripGeo, detailMaterial);
      grip1.position.set(0.25, -0.2 - i * 0.08, 0);
      endEffectorGroup.add(grip1);

      const grip2 = createWireframeFromGeometry(gripGeo, detailMaterial);
      grip2.position.set(-0.25, -0.2 - i * 0.08, 0);
      endEffectorGroup.add(grip2);
    }

    armGroup.position.set(0, 0.5, 0);
    armGroup.rotation.y = -0.4;
    armGroup.scale.set(0.7, 0.7, 0.7);

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
        animProgress = Math.min(animProgress + 0.02, 1);
      } else {
        animProgress = Math.max(animProgress - 0.015, 0);
      }

      armGroup.rotation.y = -0.4 + Math.sin(time * 0.5) * 0.15 * animProgress;

      joint1Group.rotation.z = Math.sin(time * 0.8) * 0.25 * animProgress;
      joint2Group.rotation.z = Math.sin(time * 0.6 + 1) * 0.3 * animProgress;
      joint3Group.rotation.z = Math.sin(time * 0.7 + 2) * 0.2 * animProgress;

      wristGroup.rotation.y = time * 0.8 * animProgress;

      const clawAnim = Math.sin(time * 2) * 0.18 * animProgress;
      claw1Wire.position.x = 0.25 + clawAnim;
      claw2Wire.position.x = -0.25 - clawAnim;
      claw1Detail.position.x = 0.25 + clawAnim;
      claw2Detail.position.x = -0.25 - clawAnim;

      baseGroup.rotation.y += 0.003;

      edgesMaterial.opacity = 0.4 + Math.sin(time * 2) * 0.08;
      detailMaterial.opacity = 0.25 + Math.sin(time * 2.5) * 0.08;

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
