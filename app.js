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
controls.maxPolarAngle = 1.7;
controls.rotateSpeed = 1.5;
controls.dampingFactor = 0.03;
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
    migu.position.y = -0.19;
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
  if (window.innerWidth > 780) {
    gsap.to(document.querySelector(".sidepop"), {
      width: "0%",
      duration: 0.5,
    });
    gsap.to(document.querySelectorAll(".burger"), {
      backgroundColor: "white",
      duration: 0.5,
    });
    burged = 0;
  } 
});

window.addEventListener("dblclick", (event) => {
  reset();
});

function dbtap() {
  let last = 0;
  let tm;
  return function dbtap(event) {
    const curTime = new Date().getTime();
    const tapLen = curTime - last;
    if (tapLen < 250 && tapLen > 100) {
      reset();
    } else {
      tm = setTimeout(() => {
        clearTimeout(tm);
      }, 250);
    }
    last = curTime;
  };
}

console.log(navigator.userAgent);

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  document.body.addEventListener("touchend", dbtap());
}

function reset() {
  controls.enabled = false;
  gsap.to(camera.position, {
    duration: 1.5,
    x: 4,
    y: 0,
    z: 1,
  });
  controls.enabled = true;
}

var burged = 0;

document.querySelector("#burg").onclick = function () {
  if (burged % 2 == 0) {
    gsap.to(document.querySelectorAll("#burg .burger"), {
      backgroundColor: "aquamarine",
      duration: 1,
    });
    gsap.to(document.querySelector(".sidepop"), {
      opacity: 1,
      pointerEvents: "all",
      width: "100%",
      duration: 1,
    });
  } else {
    gsap.to(document.querySelectorAll(".burger"), {
      backgroundColor: "white",
      duration: 1,
    });
    gsap.to(document.querySelector(".sidepop"), {
      opacity: 0,
      width: "0%",
      pointerEvents: "none",
      duration: 1,
    });
  }
  console.log("burged " + burged);

  burged++;
};

document.querySelector("#burg").ontouchend = function () {
  if (burged % 2 == 0) {
    gsap.to(document.querySelectorAll("#burg .burger"), {
      backgroundColor: "aquamarine",
      duration: 1,
    });
    gsap.to(document.querySelector(".sidepop"), {
      opacity: 1,
      pointerEvents: "all",
      width: "100%",
      duration: 1,
    });
  } else {
    gsap.to(document.querySelectorAll(".burger"), {
      backgroundColor: "white",
      duration: 1,
    });
    gsap.to(document.querySelector(".sidepop"), {
      opacity: 0,
      width: "0%",
      pointerEvents: "none",
      duration: 1,
    });
  }
  console.log("burged " + burged);

  burged++;
};