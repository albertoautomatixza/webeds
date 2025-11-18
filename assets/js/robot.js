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

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(2.5, 2.2, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfff6d0, 0.6);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xf4b000,
      roughness: 0.35,
      metalness: 0.6,
      envMapIntensity: 1.2
    });

    const blackMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.4,
      metalness: 0.8
    });

    const grayMat = new THREE.MeshStandardMaterial({
      color: 0x404040,
      roughness: 0.5,
      metalness: 0.7
    });

    const armGroup = new THREE.Group();
    scene.add(armGroup);

    const base = new THREE.Group();
    const baseCyl = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.4, 0.5, 32),
      blackMat
    );
    baseCyl.castShadow = true;
    base.add(baseCyl);

    const baseRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.3, 0.08, 16, 32),
      grayMat
    );
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = 0.25;
    base.add(baseRing);

    armGroup.add(base);

    const joint1 = new THREE.Group();
    joint1.position.y = 0.25;
    base.add(joint1);

    const joint1Sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 32, 32),
      grayMat
    );
    joint1Sphere.castShadow = true;
    joint1.add(joint1Sphere);

    const segment1 = new THREE.Group();
    segment1.position.y = 0.35;
    joint1.add(segment1);

    const seg1Main = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 2.2, 0.5),
      yellowMat
    );
    seg1Main.position.y = 1.1;
    seg1Main.castShadow = true;
    segment1.add(seg1Main);

    for (let i = 0; i < 3; i++) {
      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 0.12, 32),
        blackMat
      );
      band.position.y = 0.5 + i * 0.7;
      band.castShadow = true;
      segment1.add(band);
    }

    const joint2 = new THREE.Group();
    joint2.position.y = 2.2;
    segment1.add(joint2);

    const joint2Sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 32, 32),
      grayMat
    );
    joint2Sphere.castShadow = true;
    joint2.add(joint2Sphere);

    const segment2 = new THREE.Group();
    segment2.position.y = 0.32;
    joint2.add(segment2);

    const seg2Main = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 1.9, 0.45),
      yellowMat
    );
    seg2Main.position.y = 0.95;
    seg2Main.castShadow = true;
    segment2.add(seg2Main);

    for (let i = 0; i < 2; i++) {
      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 0.11, 32),
        blackMat
      );
      band.position.y = 0.4 + i * 0.8;
      band.castShadow = true;
      segment2.add(band);
    }

    const joint3 = new THREE.Group();
    joint3.position.y = 1.9;
    segment2.add(joint3);

    const joint3Sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 32, 32),
      grayMat
    );
    joint3Sphere.castShadow = true;
    joint3.add(joint3Sphere);

    const segment3 = new THREE.Group();
    segment3.position.y = 0.28;
    joint3.add(segment3);

    const seg3Main = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 1.5, 0.38),
      yellowMat
    );
    seg3Main.position.y = 0.75;
    seg3Main.castShadow = true;
    segment3.add(seg3Main);

    const wrist = new THREE.Group();
    wrist.position.y = 1.5;
    segment3.add(wrist);

    const wristCyl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.3, 32),
      grayMat
    );
    wristCyl.castShadow = true;
    wrist.add(wristCyl);

    const endEffector = new THREE.Group();
    endEffector.position.y = 0.3;
    wrist.add(endEffector);

    const clawBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.25, 0.3),
      blackMat
    );
    clawBase.castShadow = true;
    endEffector.add(clawBase);

    const claw1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.5, 0.12),
      grayMat
    );
    claw1.position.set(0.2, 0, 0);
    claw1.castShadow = true;
    endEffector.add(claw1);

    const claw2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.5, 0.12),
      grayMat
    );
    claw2.position.set(-0.2, 0, 0);
    claw2.castShadow = true;
    endEffector.add(claw2);

    armGroup.position.set(0, -1.2, 0);
    armGroup.scale.set(1.3, 1.3, 1.3);

    let targetRotY = 0;
    let targetRotX = 0;
    let targetSeg1 = 0;
    let targetSeg2 = 0;
    let targetSeg3 = 0;

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      targetRotY = x * Math.PI * 0.6;
      targetRotX = -y * Math.PI * 0.25;

      targetSeg1 = x * 0.4;
      targetSeg2 = y * 0.5;
      targetSeg3 = -x * 0.3;
    };

    document.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    function animate() {
      requestAnimationFrame(animate);

      time += 0.01;

      armGroup.rotation.y += (targetRotY - armGroup.rotation.y) * 0.08;
      armGroup.rotation.x += (targetRotX - armGroup.rotation.x) * 0.08;

      joint1.rotation.z += (targetSeg1 - joint1.rotation.z) * 0.06;
      joint2.rotation.z += (targetSeg2 - joint2.rotation.z) * 0.06;
      joint3.rotation.z += (targetSeg3 - joint3.rotation.z) * 0.06;

      base.rotation.y += 0.002;

      wrist.rotation.y = time * 0.5;

      const clawOpen = Math.sin(time * 2) * 0.15;
      claw1.position.x = 0.2 + clawOpen;
      claw2.position.x = -0.2 - clawOpen;

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
      document.removeEventListener('mousemove', handleMouseMove);
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
