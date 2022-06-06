
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'https://unpkg.com/three@0.141.0/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'https://unpkg.com/three@0.141.0/examples/jsm/geometries/TextGeometry.js'
import { FBXLoader } from 'https://unpkg.com/three@0.141.0/examples/jsm/loaders/FBXLoader.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30);
camera.position.setY(10)

renderer.render(scene, camera);

const donut = new THREE.TorusGeometry(10,3,10,90)
const donutMat = new THREE.MeshBasicMaterial( {color: 0xFF6347, wireframe: true})
const donutMesh = new THREE.Mesh(donut, donutMat)

scene.add(donutMesh)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(-20,-20,40)

const light = new THREE.AmbientLight(0xffffff)
scene.add(pointLight)
scene.add(light)



const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new FontLoader();

loader.load('Roboto Black_Italic.json', function( font ){
  const name = new TextGeometry( "Nicholas Quam", {
    font: font,
    size: 3,
    height: 5,
  });
  const nameMat = new THREE.MeshStandardMaterial({color: 0xFF6347})
  const nameMesh = new THREE.Mesh(name, nameMat)
  nameMesh.position.set(-15,5,10)
  scene.add(nameMesh)
});

const loader3d = new FBXLoader();

loader3d.load ('sumodel.fbx', (object)=> {
  object.scale.set(.1,.1,.1)
  scene.add(object)
})

const loader3d2 = new FBXLoader();

loader3d2.load('GCU Map v13.fbx', (object2)=>{
  object2.scale.set(10,10,10)
  object2.rotateX(-1.5)
  scene.add(object2)
})

function animate() {
  requestAnimationFrame(animate)

  donutMesh.position.y = 10
  donutMesh.rotation.x += 0.005
  donutMesh.rotation.y += .001
  donutMesh.rotation.z += .001

  controls.update()
  renderer.render(scene,camera)
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

animate()
