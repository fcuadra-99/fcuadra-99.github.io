import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.z = 4;
camera.position.y = 0.2;

const scene = new THREE.Scene();
let migu;
const loader = new GLTFLoader();
loader.load('migu.glb',
    function (gltf) {
        migu = gltf.scene;
        migu.position.z = 0.015;
        scene.add(migu);
    },
    function (xhr) {},
    function (error) {}
);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    scene.rotateY(.08);
    renderer.render(scene, camera);
};
reRender3D();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
})