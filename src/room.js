import './style.css'
import * as THREE from 'three';
import {  PointerLockControls } from 'three/addons/controls/PointerLockControls.js'; // libreia para mover la camara con el teclado

function main(){

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const canvas = renderer.domElement;
    canvas.id = 'c';
    document.querySelector('#app').appendChild(canvas);

    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 10, 20);

    scene.background = new THREE.Color( 'black' );

    const controls_k = new PointerLockControls(camera, renderer.domElement);
    document.addEventListener('click', () => controls_k.lock());
    const move = { forward: false, backward: false, left: false, right: false };
    document.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'KeyW': move.forward = true; break;
            case 'KeyS': move.backward = true; break;
            case 'KeyA': move.left = true; break;
            case 'KeyD': move.right = true; break;
        }
    });
    document.addEventListener('keyup', (e) => {
        switch (e.code) {
            case 'KeyW': move.forward = false; break;
            case 'KeyS': move.backward = false; break;
            case 'KeyA': move.left = false; break;
            case 'KeyD': move.right = false; break;
        }
    });

    const speed = 0.1;

    {
        const loader = new THREE.TextureLoader();
        const planeSize = 40;
        const texture = loader.load('/textures/wall_6.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        const repeats = 4;
        texture.repeat.set( repeats, repeats);

        const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
        const planeMat = new THREE.MeshPhongMaterial( {
            map: texture,
            side: THREE.DoubleSide,
        } );
        const mesh = new THREE.Mesh( planeGeo, planeMat );
        mesh.rotation.x = Math.PI * - .5;
        scene.add(mesh);

    }

    {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    }
    
    function resizeRendererToDisplaySize( renderer ){
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize){
        renderer.setSize(width, height, false);
    }
    return needResize;
    }

    function render(){
        if (resizeRendererToDisplaySize(renderer)){
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        if (move.forward) controls_k.moveForward(speed);
        if (move.backward) controls_k.moveForward(-speed);
        if (move.right) controls_k.moveRight(speed);
        if (move.left) controls_k.moveRight(-speed);

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
