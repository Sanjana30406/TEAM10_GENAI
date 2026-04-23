export function initThree(container) {

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0f1c);

  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // LIGHTING
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 10, 5);
  dirLight.castShadow = true;
  scene.add(dirLight);

  // BASE PLATFORM
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.3, 4),
    new THREE.MeshStandardMaterial({ color: 0x1f2937 })
  );
  base.receiveShadow = true;
  scene.add(base);

  // SPRING (HELIX CURVE)
  const points = [];
  for (let i = 0; i < 50; i++) {
    let t = i * 0.2;
    points.push(new THREE.Vector3(
      Math.sin(t) * 0.3,
      i * 0.05,
      Math.cos(t) * 0.3
    ));
  }

  const springGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const springMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
  const spring = new THREE.Line(springGeometry, springMaterial);
  spring.position.y = 0.3;
  scene.add(spring);

  // TOY BODY (BOBBLE HEAD)
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.4, 0.8, 32),
    new THREE.MeshStandardMaterial({ color: 0x4ade80 })
  );
  body.position.y = 1;
  body.castShadow = true;
  scene.add(body);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xf87171 })
  );
  head.position.y = 1.8;
  head.castShadow = true;
  scene.add(head);

  // HANDLE RESIZE
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  return { scene, camera, renderer, head, body, spring };
}
