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

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(6, 4.5, 7);
    camera.lookAt(0, 1.2, 0);

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

    const fillLight = new THREE.DirectionalLight(0xfacc15, 0.3);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);

    const mat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    const cncGroup = new THREE.Group();
    scene.add(cncGroup);

    var basePlatformGeo = new THREE.BoxGeometry(4.2, 0.4, 3.2, 10, 2, 8);
    var basePlatform = new THREE.Mesh(basePlatformGeo, mat);
    basePlatform.position.y = 0.2;
    cncGroup.add(basePlatform);

    var baseTopGeo = new THREE.BoxGeometry(4.0, 0.15, 3.0, 10, 1, 8);
    var baseTopPlate = new THREE.Mesh(baseTopGeo, mat);
    baseTopPlate.position.y = 0.475;
    cncGroup.add(baseTopPlate);

    var baseFrontGeo = new THREE.BoxGeometry(4.2, 0.3, 0.15, 10, 2, 1);
    var baseFront = new THREE.Mesh(baseFrontGeo, mat);
    baseFront.position.set(0, 0.2, 1.6);
    cncGroup.add(baseFront);

    var baseBackGeo = new THREE.BoxGeometry(4.2, 0.3, 0.15, 10, 2, 1);
    var baseBack = new THREE.Mesh(baseBackGeo, mat);
    baseBack.position.set(0, 0.2, -1.6);
    cncGroup.add(baseBack);

    for (var bi = 0; bi < 8; bi++) {
      var bx = -1.8 + (bi % 4) * 1.2;
      var bz = bi < 4 ? 1.6 : -1.6;
      var boltGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.12, 8, 1);
      var boltMesh = new THREE.Mesh(boltGeo, mat);
      boltMesh.position.set(bx, 0.46, bz);
      cncGroup.add(boltMesh);
    }

    var leftWallGeo = new THREE.BoxGeometry(0.35, 2.8, 2.6, 3, 10, 7);
    var leftWall = new THREE.Mesh(leftWallGeo, mat);
    leftWall.position.set(-1.9, 1.95, 0);
    cncGroup.add(leftWall);

    var rightWallGeo = new THREE.BoxGeometry(0.35, 2.8, 2.6, 3, 10, 7);
    var rightWall = new THREE.Mesh(rightWallGeo, mat);
    rightWall.position.set(1.9, 1.95, 0);
    cncGroup.add(rightWall);

    var backWallGeo = new THREE.BoxGeometry(4.2, 2.8, 0.2, 10, 10, 1);
    var backWall = new THREE.Mesh(backWallGeo, mat);
    backWall.position.set(0, 1.95, -1.5);
    cncGroup.add(backWall);

    var topPlateGeo = new THREE.BoxGeometry(4.2, 0.3, 2.8, 10, 2, 7);
    var topPlate = new THREE.Mesh(topPlateGeo, mat);
    topPlate.position.set(0, 3.5, -0.1);
    cncGroup.add(topPlate);

    var leftArchInner = new THREE.TorusGeometry(1.0, 0.18, 12, 24, Math.PI);
    var leftArchMesh = new THREE.Mesh(leftArchInner, mat);
    leftArchMesh.position.set(-1.9, 2.2, 1.0);
    leftArchMesh.rotation.y = Math.PI / 2;
    leftArchMesh.rotation.z = Math.PI / 2;
    cncGroup.add(leftArchMesh);

    var rightArchInner = new THREE.TorusGeometry(1.0, 0.18, 12, 24, Math.PI);
    var rightArchMesh = new THREE.Mesh(rightArchInner, mat);
    rightArchMesh.position.set(1.9, 2.2, 1.0);
    rightArchMesh.rotation.y = Math.PI / 2;
    rightArchMesh.rotation.z = Math.PI / 2;
    cncGroup.add(rightArchMesh);

    var xRailGroup = new THREE.Group();
    xRailGroup.position.set(0, 3.3, 0);
    cncGroup.add(xRailGroup);

    for (var ri = 0; ri < 2; ri++) {
      var railGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.4, 12, 8);
      var railMesh = new THREE.Mesh(railGeo, mat);
      railMesh.rotation.z = Math.PI / 2;
      railMesh.position.set(0, 0, -0.6 + ri * 0.5);
      xRailGroup.add(railMesh);
    }

    var xCarriageGroup = new THREE.Group();
    xCarriageGroup.position.set(0, 3.3, -0.35);
    cncGroup.add(xCarriageGroup);

    var xCarrGeo = new THREE.BoxGeometry(0.7, 0.35, 0.8, 4, 2, 4);
    var xCarr = new THREE.Mesh(xCarrGeo, mat);
    xCarriageGroup.add(xCarr);

    var spindleAssembly = new THREE.Group();
    spindleAssembly.position.y = -0.3;
    xCarriageGroup.add(spindleAssembly);

    var spindleMotorGeo = new THREE.CylinderGeometry(0.35, 0.3, 0.7, 24, 6);
    var spindleMotor = new THREE.Mesh(spindleMotorGeo, mat);
    spindleMotor.position.y = 0;
    spindleAssembly.add(spindleMotor);

    var spindleNeckGeo = new THREE.CylinderGeometry(0.25, 0.35, 0.5, 20, 4);
    var spindleNeck = new THREE.Mesh(spindleNeckGeo, mat);
    spindleNeck.position.y = -0.6;
    spindleAssembly.add(spindleNeck);

    var spindleMidGeo = new THREE.CylinderGeometry(0.28, 0.25, 0.4, 20, 4);
    var spindleMid = new THREE.Mesh(spindleMidGeo, mat);
    spindleMid.position.y = -1.05;
    spindleAssembly.add(spindleMid);

    var spindleBodyGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.6, 20, 5);
    var spindleBody = new THREE.Mesh(spindleBodyGeo, mat);
    spindleBody.position.y = -1.55;
    spindleAssembly.add(spindleBody);

    var spindleTipGeo = new THREE.CylinderGeometry(0.12, 0.2, 0.3, 16, 3);
    var spindleTip = new THREE.Mesh(spindleTipGeo, mat);
    spindleTip.position.y = -2.0;
    spindleAssembly.add(spindleTip);

    var toolHolderGeo = new THREE.CylinderGeometry(0.06, 0.12, 0.25, 12, 3);
    var toolHolderMesh = new THREE.Mesh(toolHolderGeo, mat);
    toolHolderMesh.position.y = -2.25;
    spindleAssembly.add(toolHolderMesh);

    var cuttingBitGeo = new THREE.ConeGeometry(0.04, 0.3, 12, 4);
    var cuttingBit = new THREE.Mesh(cuttingBitGeo, mat);
    cuttingBit.position.y = -2.5;
    spindleAssembly.add(cuttingBit);

    for (var sr = 0; sr < 4; sr++) {
      var ringGeo = new THREE.TorusGeometry(0.32 - sr * 0.04, 0.02, 8, 24);
      var ringMesh = new THREE.Mesh(ringGeo, mat);
      ringMesh.position.y = -0.2 - sr * 0.45;
      ringMesh.rotation.x = Math.PI / 2;
      spindleAssembly.add(ringMesh);
    }

    var rotaryGroup = new THREE.Group();
    rotaryGroup.position.set(-0.3, 0.55, 0.4);
    cncGroup.add(rotaryGroup);

    var rotaryBaseGeo = new THREE.CylinderGeometry(0.9, 1.0, 0.3, 32, 3);
    var rotaryBaseMesh = new THREE.Mesh(rotaryBaseGeo, mat);
    rotaryGroup.add(rotaryBaseMesh);

    var rotaryRingGeo = new THREE.TorusGeometry(0.85, 0.06, 12, 32);
    var rotaryRing = new THREE.Mesh(rotaryRingGeo, mat);
    rotaryRing.position.y = 0.18;
    rotaryRing.rotation.x = Math.PI / 2;
    rotaryGroup.add(rotaryRing);

    for (var rib = 0; rib < 12; rib++) {
      var ribAngle = (rib / 12) * Math.PI * 2;
      var ribGeo = new THREE.BoxGeometry(0.04, 0.05, 0.4, 1, 1, 3);
      var ribMesh = new THREE.Mesh(ribGeo, mat);
      ribMesh.position.set(
        Math.cos(ribAngle) * 0.7,
        0.18,
        Math.sin(ribAngle) * 0.7
      );
      ribMesh.rotation.y = -ribAngle;
      rotaryGroup.add(ribMesh);
    }

    var tiltGroup = new THREE.Group();
    tiltGroup.position.y = 0.35;
    rotaryGroup.add(tiltGroup);

    var leftSupportGeo = new THREE.TorusGeometry(0.65, 0.12, 12, 20, Math.PI);
    var leftSupport = new THREE.Mesh(leftSupportGeo, mat);
    leftSupport.position.set(-0.7, 0.3, 0);
    leftSupport.rotation.z = Math.PI / 2;
    tiltGroup.add(leftSupport);

    var rightSupportGeo = new THREE.TorusGeometry(0.65, 0.12, 12, 20, Math.PI);
    var rightSupport = new THREE.Mesh(rightSupportGeo, mat);
    rightSupport.position.set(0.7, 0.3, 0);
    rightSupport.rotation.z = -Math.PI / 2;
    tiltGroup.add(rightSupport);

    var leftArmGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.7, 16, 4);
    var leftArm = new THREE.Mesh(leftArmGeo, mat);
    leftArm.position.set(-0.7, 0, 0);
    tiltGroup.add(leftArm);

    var rightArmGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.7, 16, 4);
    var rightArm = new THREE.Mesh(rightArmGeo, mat);
    rightArm.position.set(0.7, 0, 0);
    tiltGroup.add(rightArm);

    var leftJointGeo = new THREE.SphereGeometry(0.14, 16, 16);
    var leftJoint = new THREE.Mesh(leftJointGeo, mat);
    leftJoint.position.set(-0.7, 0.35, 0);
    tiltGroup.add(leftJoint);

    var rightJointGeo = new THREE.SphereGeometry(0.14, 16, 16);
    var rightJoint = new THREE.Mesh(rightJointGeo, mat);
    rightJoint.position.set(0.7, 0.35, 0);
    tiltGroup.add(rightJoint);

    var tiltPlatformGroup = new THREE.Group();
    tiltPlatformGroup.position.y = 0.55;
    tiltGroup.add(tiltPlatformGroup);

    var tiltPlateGeo = new THREE.BoxGeometry(1.0, 0.15, 0.8, 6, 1, 5);
    var tiltPlate = new THREE.Mesh(tiltPlateGeo, mat);
    tiltPlatformGroup.add(tiltPlate);

    var workpieceGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55, 6, 6, 6);
    var workpiece = new THREE.Mesh(workpieceGeo, mat);
    workpiece.position.y = 0.35;
    tiltPlatformGroup.add(workpiece);

    var wpChamfer1Geo = new THREE.BoxGeometry(0.35, 0.25, 0.35, 4, 3, 4);
    var wpChamfer1 = new THREE.Mesh(wpChamfer1Geo, mat);
    wpChamfer1.position.y = 0.55;
    tiltPlatformGroup.add(wpChamfer1);

    var wpHoleGeo = new THREE.TorusGeometry(0.12, 0.03, 8, 16);
    var wpHole = new THREE.Mesh(wpHoleGeo, mat);
    wpHole.position.set(0, 0.35, 0.28);
    tiltPlatformGroup.add(wpHole);

    var wpHole2Geo = new THREE.TorusGeometry(0.1, 0.03, 8, 16);
    var wpHole2 = new THREE.Mesh(wpHole2Geo, mat);
    wpHole2.position.set(0.28, 0.35, 0);
    wpHole2.rotation.y = Math.PI / 2;
    tiltPlatformGroup.add(wpHole2);

    for (var ci = 0; ci < 4; ci++) {
      var clampAngle = (ci / 4) * Math.PI * 2 + Math.PI / 4;
      var clampGeo = new THREE.BoxGeometry(0.08, 0.12, 0.2, 2, 2, 3);
      var clampMesh = new THREE.Mesh(clampGeo, mat);
      clampMesh.position.set(
        Math.cos(clampAngle) * 0.45,
        0.12,
        Math.sin(clampAngle) * 0.45
      );
      clampMesh.rotation.y = -clampAngle;
      tiltPlatformGroup.add(clampMesh);
    }

    var leftChuckGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.3, 20, 3);
    var leftChuck = new THREE.Mesh(leftChuckGeo, mat);
    leftChuck.position.set(-1.2, 0.55, 0.4);
    leftChuck.rotation.z = Math.PI / 2;
    cncGroup.add(leftChuck);

    var leftChuckRingGeo = new THREE.TorusGeometry(0.22, 0.04, 10, 20);
    var leftChuckRing = new THREE.Mesh(leftChuckRingGeo, mat);
    leftChuckRing.position.set(-1.35, 0.55, 0.4);
    leftChuckRing.rotation.y = Math.PI / 2;
    cncGroup.add(leftChuckRing);

    var leftChuckBaseGeo = new THREE.BoxGeometry(0.4, 0.5, 0.5, 3, 4, 3);
    var leftChuckBase = new THREE.Mesh(leftChuckBaseGeo, mat);
    leftChuckBase.position.set(-1.55, 0.55, 0.4);
    cncGroup.add(leftChuckBase);

    cncGroup.scale.set(0.48, 0.48, 0.48);
    cncGroup.position.set(0, -0.2, 0);
    cncGroup.rotation.y = -0.4;

    var time = 0;

    function animate() {
      requestAnimationFrame(animate);

      time += 0.008;

      xCarriageGroup.position.x = Math.sin(time * 0.7) * 0.6;
      xCarriageGroup.position.z = -0.35 + Math.sin(time * 0.5 + 1.5) * 0.3;

      spindleAssembly.position.y = -0.3 + Math.sin(time * 0.6 + 0.8) * 0.15;

      spindleMotor.rotation.y += 0.12;
      spindleNeck.rotation.y += 0.12;
      spindleMid.rotation.y += 0.12;
      spindleBody.rotation.y += 0.12;
      spindleTip.rotation.y += 0.12;
      toolHolderMesh.rotation.y += 0.12;
      cuttingBit.rotation.y += 0.12;

      rotaryGroup.rotation.y = Math.sin(time * 0.3) * 0.4;

      tiltPlatformGroup.rotation.x = Math.sin(time * 0.4 + 1) * 0.2;
      tiltPlatformGroup.rotation.z = Math.sin(time * 0.35 + 2) * 0.15;

      mat.opacity = 0.30 + Math.sin(time * 1.5) * 0.08;

      renderer.render(scene, camera);
    }
    animate();

    var handleResize = function() {
      var newWidth = container.offsetWidth;
      var newHeight = container.offsetHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    setTimeout(function() {
      canvas.style.opacity = '1';
    }, 100);

    return function() {
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
