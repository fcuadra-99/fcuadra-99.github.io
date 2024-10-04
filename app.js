import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls";
import { gsap } from "https://cdn.skypack.dev/gsap";

const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.01,
  500
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = 1.5;
controls.maxDistance = 10;
controls.minDistance = 3;
controls.enablePan = false;

camera.position.set(4, 0, 1);

const scene = new THREE.Scene();

let migu;
const loader = new GLTFLoader();
loader.load(
  "migu.glb",
  function (gltf) {
    migu = gltf.scene;
    migu.position.z = 0.015;
    migu.position.y = -0.2;
    scene.add(migu);
  },
  function (xhr) {
    document.getElementById("container3D").style.animation =
      "intro 4s ease-out";
  },
  function (error) {}
);

const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  scene.rotateY(0.05);
  controls.update(2);
  renderer.render(scene, camera);
};
reRender3D();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

window.addEventListener("dragend", () => {
  controls.enableDamping = false;
  gsap.to(camera.position, {
    duration: 1,
    x: 4,
    y: 0,
    z: 1,
  });
  controls.enableDamping = true;
});
