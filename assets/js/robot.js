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
    camera.position.set(4, 2.5, 7);
    camera.lookAt(0, 2, 0);

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

    const gridHelper = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.08;
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    const verticalGridMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.06
    });

    for (let i = -10; i <= 10; i += 0.5) {
      const points = [
        new THREE.Vector3(i, -0.1, -10),
        new THREE.Vector3(i, 8, -10)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, verticalGridMaterial);
      scene.add(line);
    }

    for (let j = 0; j <= 8; j += 0.5) {
      const points = [
        new THREE.Vector3(-10, j, -10),
        new THREE.Vector3(10, j, -10)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, verticalGridMaterial);
      scene.add(line);
    }

    const armGroup = new THREE.Group();
    scene.add(armGroup);

    const baseGroup = new THREE.Group();
    armGroup.add(baseGroup);

    const basePlateGeo = new THREE.BoxGeometry(2.2, 0.12, 1.8, 6, 1, 5);
    const basePlate = new THREE.Mesh(basePlateGeo, meshMaterial);
    basePlate.position.y = -0.06;
    baseGroup.add(basePlate);

    const baseRiserGeo = new THREE.BoxGeometry(1.6, 0.35, 1.3, 5, 2, 4);
    const baseRiser = new THREE.Mesh(baseRiserGeo, meshMaterial);
    baseRiser.position.y = 0.175;
    baseGroup.add(baseRiser);

    const baseMainGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.5, 32, 3);
    const baseMain = new THREE.Mesh(baseMainGeo, meshMaterial);
    baseMain.position.y = 0.6;
    baseGroup.add(baseMain);

    const baseTopGeo = new THREE.CylinderGeometry(0.75, 0.85, 0.25, 32, 2);
    const baseTop = new THREE.Mesh(baseTopGeo, meshMaterial);
    baseTop.position.y = 0.975;
    baseGroup.add(baseTop);

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * 0.95;
      const z = Math.sin(angle) * 0.95;

      const boltGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 8, 1);
      const bolt = new THREE.Mesh(boltGeo, meshMaterial);
      bolt.position.set(x, -0.1, z);
      baseGroup.add(bolt);
    }

    const shoulderGroup = new THREE.Group();
    shoulderGroup.position.y = 1.1;
    shoulderGroup.rotation.z = -0.25;
    baseGroup.add(shoulderGroup);

    const shoulderHousingGeo = new THREE.BoxGeometry(0.9, 0.65, 0.75, 4, 3, 3);
    const shoulderHousing = new THREE.Mesh(shoulderHousingGeo, meshMaterial);
    shoulderGroup.add(shoulderHousing);

    const shoulderJointGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.85, 24, 3);
    const shoulderJoint = new THREE.Mesh(shoulderJointGeo, meshMaterial);
    shoulderJoint.rotation.z = Math.PI / 2;
    shoulderGroup.add(shoulderJoint);

    for (let side of [-1, 1]) {
      const capGeo = new THREE.SphereGeometry(0.42, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const cap = new THREE.Mesh(capGeo, meshMaterial);
      cap.rotation.z = side === 1 ? -Math.PI / 2 : Math.PI / 2;
      cap.position.z = side * 0.425;
      shoulderGroup.add(cap);
    }

    const upperArmGroup = new THREE.Group();
    upperArmGroup.position.y = 0.3;
    shoulderGroup.add(upperArmGroup);

    const upperArmMainGeo = new THREE.BoxGeometry(0.55, 2.4, 0.52, 3, 10, 3);
    const upperArmMain = new THREE.Mesh(upperArmMainGeo, meshMaterial);
    upperArmMain.position.y = 1.2;
    upperArmGroup.add(upperArmMain);

    const upperArmCylGeo = new THREE.CylinderGeometry(0.28, 0.28, 2.3, 20, 8);
    const upperArmCyl = new THREE.Mesh(upperArmCylGeo, meshMaterial);
    upperArmCyl.position.y = 1.15;
    upperArmGroup.add(upperArmCyl);

    for (let i = 0; i < 3; i++) {
      const plateGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 24, 1);
      const plate = new THREE.Mesh(plateGeo, meshMaterial);
      plate.position.y = 0.3 + i * 0.95;
      upperArmGroup.add(plate);
    }

    const elbowGroup = new THREE.Group();
    elbowGroup.position.y = 2.4;
    elbowGroup.rotation.z = 0.85;
    upperArmGroup.add(elbowGroup);

    const elbowHousingGeo = new THREE.BoxGeometry(0.75, 0.55, 0.65, 3, 3, 3);
    const elbowHousing = new THREE.Mesh(elbowHousingGeo, meshMaterial);
    elbowGroup.add(elbowHousing);

    const elbowJointGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.75, 24, 3);
    const elbowJoint = new THREE.Mesh(elbowJointGeo, meshMaterial);
    elbowJoint.rotation.z = Math.PI / 2;
    elbowGroup.add(elbowJoint);

    for (let side of [-1, 1]) {
      const capGeo = new THREE.SphereGeometry(0.36, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const cap = new THREE.Mesh(capGeo, meshMaterial);
      cap.rotation.z = side === 1 ? -Math.PI / 2 : Math.PI / 2;
      cap.position.z = side * 0.375;
      elbowGroup.add(cap);
    }

    const forearmGroup = new THREE.Group();
    forearmGroup.position.y = 0.25;
    elbowGroup.add(forearmGroup);

    const forearmBoxGeo = new THREE.BoxGeometry(0.48, 1.85, 0.45, 3, 8, 3);
    const forearmBox = new THREE.Mesh(forearmBoxGeo, meshMaterial);
    forearmBox.position.y = 0.925;
    forearmGroup.add(forearmBox);

    const forearmCylGeo = new THREE.CylinderGeometry(0.24, 0.24, 1.75, 20, 7);
    const forearmCyl = new THREE.Mesh(forearmCylGeo, meshMaterial);
    forearmCyl.position.y = 0.875;
    forearmGroup.add(forearmCyl);

    for (let i = 0; i < 2; i++) {
      const plateGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.06, 20, 1);
      const plate = new THREE.Mesh(plateGeo, meshMaterial);
      plate.position.y = 0.2 + i * 1.25;
      forearmGroup.add(plate);
    }

    const wristGroup = new THREE.Group();
    wristGroup.position.y = 1.85;
    wristGroup.rotation.z = -0.15;
    forearmGroup.add(wristGroup);

    const wristHousingGeo = new THREE.BoxGeometry(0.55, 0.4, 0.5, 3, 2, 3);
    const wristHousing = new THREE.Mesh(wristHousingGeo, meshMaterial);
    wristGroup.add(wristHousing);

    const wristJoint1Geo = new THREE.CylinderGeometry(0.28, 0.28, 0.55, 20, 2);
    const wristJoint1 = new THREE.Mesh(wristJoint1Geo, meshMaterial);
    wristJoint1.rotation.z = Math.PI / 2;
    wristGroup.add(wristJoint1);

    const wristExtensionGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.35, 20, 2);
    const wristExtension = new THREE.Mesh(wristExtensionGeo, meshMaterial);
    wristExtension.position.y = 0.35;
    wristGroup.add(wristExtension);

    const wristJoint2Geo = new THREE.CylinderGeometry(0.2, 0.2, 0.58, 20, 2);
    const wristJoint2 = new THREE.Mesh(wristJoint2Geo, meshMaterial);
    wristJoint2.position.y = 0.525;
    wristJoint2.rotation.x = Math.PI / 2;
    wristGroup.add(wristJoint2);

    const endEffectorGroup = new THREE.Group();
    endEffectorGroup.position.y = 0.75;
    wristGroup.add(endEffectorGroup);

    const toolMountGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.25, 20, 2);
    const toolMount = new THREE.Mesh(toolMountGeo, meshMaterial);
    endEffectorGroup.add(toolMount);

    const toolPlateGeo = new THREE.BoxGeometry(0.38, 0.15, 0.32, 3, 1, 3);
    const toolPlate = new THREE.Mesh(toolPlateGeo, meshMaterial);
    toolPlate.position.y = 0.2;
    endEffectorGroup.add(toolPlate);

    const gripperBaseGeo = new THREE.BoxGeometry(0.35, 0.22, 0.28, 3, 2, 2);
    const gripperBase = new THREE.Mesh(gripperBaseGeo, meshMaterial);
    gripperBase.position.y = 0.38;
    endEffectorGroup.add(gripperBase);

    const claw1Geo = new THREE.BoxGeometry(0.08, 0.45, 0.1, 2, 6, 2);
    const claw1 = new THREE.Mesh(claw1Geo, meshMaterial);
    claw1.position.set(0.18, 0.25, 0);
    endEffectorGroup.add(claw1);

    const claw2 = new THREE.Mesh(claw1Geo, meshMaterial);
    claw2.position.set(-0.18, 0.25, 0);
    endEffectorGroup.add(claw2);

    const finger1Geo = new THREE.BoxGeometry(0.06, 0.25, 0.08, 2, 4, 2);
    const finger1 = new THREE.Mesh(finger1Geo, meshMaterial);
    finger1.position.set(0.18, 0.6, 0);
    finger1.rotation.z = -0.2;
    endEffectorGroup.add(finger1);

    const finger2 = new THREE.Mesh(finger1Geo, meshMaterial);
    finger2.position.set(-0.18, 0.6, 0);
    finger2.rotation.z = 0.2;
    endEffectorGroup.add(finger2);

    armGroup.position.set(0, 0, 0);
    armGroup.rotation.y = -0.25;
    armGroup.scale.set(0.62, 0.62, 0.62);

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

      baseGroup.rotation.y += 0.002;

      const shoulderBase = -0.25;
      shoulderGroup.rotation.z = shoulderBase + Math.sin(time * 0.5) * 0.15 * animProgress;

      const elbowBase = 0.85;
      elbowGroup.rotation.z = elbowBase + Math.sin(time * 0.4 + 1) * 0.2 * animProgress;

      const wristBase = -0.15;
      wristGroup.rotation.z = wristBase + Math.sin(time * 0.45 + 2) * 0.12 * animProgress;

      wristJoint2.rotation.x = Math.PI / 2 + time * 0.6 * animProgress;

      const clawAnim = Math.sin(time * 1.5) * 0.12 * animProgress;
      claw1.position.x = 0.18 + clawAnim;
      claw2.position.x = -0.18 - clawAnim;
      finger1.position.x = 0.18 + clawAnim;
      finger2.position.x = -0.18 - clawAnim;

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
