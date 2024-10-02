import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);
camera.position.z = 4;
camera.position.y = 0.2;

const scene = new THREE.Scene();
let migu;
const loader = new GLTFLoader();
loader.load('migu.glb',
    function (gltf) {
        migu = gltf.scene;
        scene.add(migu);
    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const reRender3D = () => {
    scene.rotateY(.1);
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
};
reRender3D();


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})