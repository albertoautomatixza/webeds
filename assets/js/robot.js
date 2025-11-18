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

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const light = new THREE.DirectionalLight(0xffffff, 1.3);
    light.position.set(5, 10, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xf4b000,
      roughness: 0.45,
      metalness: 0.4
    });

    const blackMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.6
    });

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.3, 0.4, 32),
      blackMat
    );
    scene.add(base);

    const seg1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 2, 0.4),
      yellowMat
    );
    seg1.position.y = 1.2;
    base.add(seg1);

    const seg2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 1.8, 0.35),
      yellowMat
    );
    seg2.position.y = 1.8;
    seg1.add(seg2);

    const seg3 = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 1.4, 0.3),
      yellowMat
    );
    seg3.position.y = 1.6;
    seg2.add(seg3);

    const claw = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.25, 0.25),
      blackMat
    );
    claw.position.y = 1;
    seg3.add(claw);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    document.addEventListener("mousemove", handleMouseMove);

    function animate() {
      requestAnimationFrame(animate);

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      seg1.rotation.z = mouseX * 0.8;
      seg2.rotation.z = mouseY * 0.6;
      seg3.rotation.z = mouseX * -0.6;

      base.rotation.y += 0.003;

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
