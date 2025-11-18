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

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.5, 2.5, 8);
    camera.lookAt(0, 1.8, 0);

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

    const annotationLineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25
    });

    const annotationDotMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    });

    const armGroup = new THREE.Group();
    scene.add(armGroup);

    const baseGroup = new THREE.Group();
    armGroup.add(baseGroup);

    const baseCylGeo = new THREE.CylinderGeometry(1.2, 1.5, 0.5, 32, 4);
    const baseMesh = new THREE.Mesh(baseCylGeo, meshMaterial);
    baseGroup.add(baseMesh);

    const baseTopGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.15, 32, 2);
    const baseTop = new THREE.Mesh(baseTopGeo, meshMaterial);
    baseTop.position.y = 0.325;
    baseGroup.add(baseTop);

    const basePlateGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 32, 1);
    const basePlate = new THREE.Mesh(basePlateGeo, meshMaterial);
    basePlate.position.y = -0.3;
    baseGroup.add(basePlate);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const boltGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.12, 8, 1);
      const bolt = new THREE.Mesh(boltGeo, meshMaterial);
      bolt.position.x = Math.cos(angle) * 1.35;
      bolt.position.z = Math.sin(angle) * 1.35;
      bolt.position.y = -0.3;
      baseGroup.add(bolt);
    }

    const joint1Group = new THREE.Group();
    joint1Group.position.y = 0.5;
    baseGroup.add(joint1Group);

    const joint1Geo = new THREE.SphereGeometry(0.45, 24, 24);
    const joint1 = new THREE.Mesh(joint1Geo, meshMaterial);
    joint1Group.add(joint1);

    const segment1Group = new THREE.Group();
    segment1Group.position.y = 0.45;
    joint1Group.add(segment1Group);

    const seg1MainGeo = new THREE.CylinderGeometry(0.35, 0.35, 2.2, 24, 8);
    const seg1Main = new THREE.Mesh(seg1MainGeo, meshMaterial);
    seg1Main.position.y = 1.1;
    segment1Group.add(seg1Main);

    const seg1BoxGeo = new THREE.BoxGeometry(0.65, 2.2, 0.5, 4, 8, 3);
    const seg1Box = new THREE.Mesh(seg1BoxGeo, meshMaterial);
    seg1Box.position.y = 1.1;
    segment1Group.add(seg1Box);

    for (let i = 0; i < 3; i++) {
      const plateGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.08, 24, 1);
      const plate = new THREE.Mesh(plateGeo, meshMaterial);
      plate.position.y = 0.3 + i * 0.9;
      segment1Group.add(plate);
    }

    const joint2Group = new THREE.Group();
    joint2Group.position.y = 2.2;
    segment1Group.add(joint2Group);

    const joint2Geo = new THREE.SphereGeometry(0.4, 24, 24);
    const joint2 = new THREE.Mesh(joint2Geo, meshMaterial);
    joint2Group.add(joint2);

    const segment2Group = new THREE.Group();
    segment2Group.position.y = 0.4;
    joint2Group.add(segment2Group);

    const seg2MainGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.8, 24, 8);
    const seg2Main = new THREE.Mesh(seg2MainGeo, meshMaterial);
    seg2Main.position.y = 0.9;
    segment2Group.add(seg2Main);

    const seg2BoxGeo = new THREE.BoxGeometry(0.55, 1.8, 0.45, 4, 8, 3);
    const seg2Box = new THREE.Mesh(seg2BoxGeo, meshMaterial);
    seg2Box.position.y = 0.9;
    segment2Group.add(seg2Box);

    for (let i = 0; i < 2; i++) {
      const plateGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 24, 1);
      const plate = new THREE.Mesh(plateGeo, meshMaterial);
      plate.position.y = 0.2 + i * 1.2;
      segment2Group.add(plate);
    }

    const joint3Group = new THREE.Group();
    joint3Group.position.y = 1.8;
    segment2Group.add(joint3Group);

    const joint3Geo = new THREE.SphereGeometry(0.35, 24, 24);
    const joint3 = new THREE.Mesh(joint3Geo, meshMaterial);
    joint3Group.add(joint3);

    const segment3Group = new THREE.Group();
    segment3Group.position.y = 0.35;
    joint3Group.add(segment3Group);

    const seg3Geo = new THREE.CylinderGeometry(0.25, 0.25, 1.3, 24, 6);
    const seg3 = new THREE.Mesh(seg3Geo, meshMaterial);
    seg3.position.y = 0.65;
    segment3Group.add(seg3);

    const seg3BoxGeo = new THREE.BoxGeometry(0.45, 1.3, 0.38, 4, 6, 3);
    const seg3Box = new THREE.Mesh(seg3BoxGeo, meshMaterial);
    seg3Box.position.y = 0.65;
    segment3Group.add(seg3Box);

    const wristGroup = new THREE.Group();
    wristGroup.position.y = 1.3;
    segment3Group.add(wristGroup);

    const wristGeo = new THREE.SphereGeometry(0.28, 24, 24);
    const wrist = new THREE.Mesh(wristGeo, meshMaterial);
    wristGroup.add(wrist);

    const wristCylGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.3, 24, 2);
    const wristCyl = new THREE.Mesh(wristCylGeo, meshMaterial);
    wristCyl.position.y = 0.15;
    wristGroup.add(wristCyl);

    const endEffectorGroup = new THREE.Group();
    endEffectorGroup.position.y = 0.35;
    wristGroup.add(endEffectorGroup);

    const gripperBaseGeo = new THREE.BoxGeometry(0.4, 0.25, 0.3, 3, 2, 2);
    const gripperBase = new THREE.Mesh(gripperBaseGeo, meshMaterial);
    endEffectorGroup.add(gripperBase);

    const claw1Geo = new THREE.BoxGeometry(0.1, 0.5, 0.12, 2, 6, 2);
    const claw1 = new THREE.Mesh(claw1Geo, meshMaterial);
    claw1.position.set(0.22, -0.05, 0);
    endEffectorGroup.add(claw1);

    const claw2 = new THREE.Mesh(claw1Geo, meshMaterial);
    claw2.position.set(-0.22, -0.05, 0);
    endEffectorGroup.add(claw2);

    const annotations = [];

    function createAnnotation(position, direction, length = 1.5) {
      const group = new THREE.Group();

      const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const dot = new THREE.Mesh(dotGeo, annotationDotMaterial);
      group.add(dot);

      const linePoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(direction.x * length, direction.y * length, direction.z * length)
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const line = new THREE.Line(lineGeo, annotationLineMaterial);
      group.add(line);

      group.position.copy(position);
      armGroup.add(group);
      annotations.push({ group, dot, line });
      return group;
    }

    createAnnotation(new THREE.Vector3(0, -0.35, 0), new THREE.Vector3(1.2, -0.3, 0.8), 1.8);
    createAnnotation(new THREE.Vector3(0.35, 0.8, 0.3), new THREE.Vector3(1, 0.2, 0.5), 1.6);
    createAnnotation(new THREE.Vector3(-0.3, 1.5, -0.25), new THREE.Vector3(-0.8, 0.3, -0.6), 1.5);
    createAnnotation(new THREE.Vector3(0.3, 2.8, 0.2), new THREE.Vector3(0.9, 0.4, 0.4), 1.7);
    createAnnotation(new THREE.Vector3(-0.25, 3.8, -0.2), new THREE.Vector3(-0.8, 0.5, -0.5), 1.6);
    createAnnotation(new THREE.Vector3(0.2, 5.2, 0.15), new THREE.Vector3(0.7, 0.6, 0.4), 1.5);
    createAnnotation(new THREE.Vector3(-0.15, 6.1, -0.15), new THREE.Vector3(-0.6, 0.7, -0.5), 1.4);
    createAnnotation(new THREE.Vector3(0.25, 6.8, 0.1), new THREE.Vector3(0.8, 0.3, 0.5), 1.3);

    armGroup.position.set(0, 0, 0);
    armGroup.rotation.y = -0.3;
    armGroup.scale.set(0.65, 0.65, 0.65);

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

      time += 0.008;

      if (isHovered) {
        animProgress = Math.min(animProgress + 0.015, 1);
      } else {
        animProgress = Math.max(animProgress - 0.01, 0);
      }

      armGroup.rotation.y = -0.3 + Math.sin(time * 0.5) * 0.12 * animProgress;

      joint1Group.rotation.z = Math.sin(time * 0.6) * 0.2 * animProgress;
      joint2Group.rotation.z = Math.sin(time * 0.5 + 1) * 0.25 * animProgress;
      joint3Group.rotation.z = Math.sin(time * 0.55 + 2) * 0.18 * animProgress;

      wristGroup.rotation.y = time * 0.6 * animProgress;

      const clawAnim = Math.sin(time * 1.5) * 0.15 * animProgress;
      claw1.position.x = 0.22 + clawAnim;
      claw2.position.x = -0.22 - clawAnim;

      baseGroup.rotation.y += 0.002;

      meshMaterial.opacity = 0.32 + Math.sin(time * 1.8) * 0.06;
      annotationLineMaterial.opacity = 0.22 + Math.sin(time * 2.2) * 0.06;
      annotationDotMaterial.opacity = 0.35 + Math.sin(time * 2) * 0.08;

      annotations.forEach((ann, i) => {
        const offset = i * 0.5;
        const pulse = Math.sin(time * 2 + offset) * 0.02 + 0.02;
        ann.dot.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
      });

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
