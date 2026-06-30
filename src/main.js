import './style.css'

const scene = new THREE.Scene();

const fov = 75;
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(
  fov,
  aspectRatio,
  near,
  far
)
camera.position.z = 2;
camera.position.y = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('#app').appendChild(renderer.domElement);

// inserta tu videojuego desde aqui :v

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.lookAt(cube.position)

renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.002;
  renderer.render(scene, camera);
}

animate();