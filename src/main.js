import './style.css'

const scene = new THREE.Scene(); // aqui se crea el esceneario

// en esta parte es la configuracion de la perspectiva de la camara
const fov = 75; // field of view
const aspectRatio = window.innerWidth / window.innerHeight; // relacion de aspecto (ancho / alto) para que la imagen no se vea estirada
const near = 0.1; // distancia minima que la camara puede ver
const far = 1000; // distancia maxima que la camara puede ver

const camera = new THREE.PerspectiveCamera(
  fov,
  aspectRatio,
  near,
  far
)
camera.position.z = 2; // ubicamos la camara un poco atras
camera.position.y = 0; // ubicamos la camara un poco arriba
//-----------------------------------------------------------------

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('#app').appendChild(renderer.domElement);

// inserta tu videojuego desde aqui :v

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;

const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);


function makeInstance(geometry, color, x){
  const material = new THREE.MeshPhongMaterial({color});
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
}

const cubes = [
  makeInstance(geometry, 0x44aa88, 0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844,  2),
];

// configuracion para la iluminacion
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1,2,4);
scene.add(light);
//-----------------------------------------------------------


function animate(time) {
  time *= 0.001;
  
  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);