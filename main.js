import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const canvas = document.querySelector('#bg');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05070a);

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 10, 30);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const donutMesh = new THREE.Mesh(
  new THREE.TorusGeometry(10, 3, 10, 90),
  new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true }),
);
donutMesh.position.y = 10;
scene.add(donutMesh);

const pointLight = new THREE.PointLight(0xffffff, 1.3);
pointLight.position.set(-20, -20, 40);
scene.add(pointLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.25));
scene.add(new THREE.GridHelper(200, 50));

const fontUrl = new URL('./Roboto Black_Italic.json', import.meta.url).href;
const modelUrl = new URL('./SUlogo3dmodel.fbx', import.meta.url).href;

new FontLoader().load(fontUrl, (font) => {
  const nameMesh = new THREE.Mesh(
    new TextGeometry('Nicholas Quam', {
      font,
      size: 3,
      height: 0.7,
    }),
    new THREE.MeshStandardMaterial({ color: 0xff6347 }),
  );

  nameMesh.position.set(-15, 5, 10);
  scene.add(nameMesh);
});

new FBXLoader().load(
  modelUrl,
  (object) => {
    object.scale.set(0.1, 0.1, 0.1);
    object.position.set(12, 0, 0);
    scene.add(object);
  },
  undefined,
  (error) => {
    console.error('Unable to load bundled FBX model:', error);
  },
);

function animate() {
  donutMesh.rotation.x += 0.005;
  donutMesh.rotation.y += 0.001;
  donutMesh.rotation.z += 0.001;

  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(animate);
