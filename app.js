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

//Camera Controls
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

//Ground
const g1 = new THREE.CircleGeometry( 0.07, 32 ); 
const shad = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.15 } ); 
const c1 = new THREE.Mesh( g1, shad );
c1.rotateX(4.71);
c1.position.y += -0.1852;
scene.add( c1 );

const dl = new THREE.DirectionalLight( 0x0fffff, 1 );
scene.add( dl );


let migu;
const loader = new GLTFLoader();
loader.load(
  "migu.glb",
  function (gltf) {
    migu = gltf.scene;
    migu.position.z += 0.005;
    migu.position.y = -0.185;
    scene.add(migu);
  },
  function (xhr) {
    document.getElementById("container3D").style.animation =
      "intro 1s ease-out";
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

var bked;
var burged = 0;

if (
  sessionStorage.getItem("bked") != null ||
  sessionStorage.getItem("bked") != NaN
) {
  bked = sessionStorage.getItem("bked");
  console.log(bked);
  if (bked % 2 != 0) {
    document.querySelector(":root").style.setProperty("--black", "#ffffff");
    document.querySelector(":root").style.setProperty("--hili", "#ffffff");
    document
      .querySelector(":root")
      .style.setProperty("--blue", "rgb(70, 243, 234)");
    document
      .querySelector(":root")
      .style.setProperty("--hilb", "rgb(77, 219, 212)");
    document
      .querySelector(":root")
      .style.setProperty("--activeb", "rgb(77, 219, 212)");
    document.querySelector(":root").style.setProperty("--active", "#ffffff");
    document.querySelector(":root").style.setProperty("--font", "#000000");
    document.querySelector(":root").style.setProperty("--bod", "#f5f5f5");
    document.querySelector(":root").style.setProperty("--nav", "#ffffff");
  } else {
    document.querySelector(":root").style.setProperty("--black", "#000000");
    document.querySelector(":root").style.setProperty("--hili", "#000000");
    document
      .querySelector(":root")
      .style.setProperty("--blue", "rgb(70, 243, 234)");
    document.querySelector(":root").style.setProperty("--hilb", "#ececec");
    document
      .querySelector(":root")
      .style.setProperty("--activeb", "rgb(44, 44, 44)");
    document
      .querySelector(":root")
      .style.setProperty("--active", "rgb(70, 243, 234)");
    document.querySelector(":root").style.setProperty("--font", "#ececec");
    document.querySelector(":root").style.setProperty("--bod", "#1b1b1b");
    document
      .querySelector(":root")
      .style.setProperty("--nav", "rgb(44, 44, 44)");
  }
} else {
  bked = 0;
  sessionStorage.setItem("bked", bked);
}

document.querySelector(".btn").addEventListener("dragend", () => {
  bked = sessionStorage.getItem("bked");
  theme(bked);
  bked++;
  if (
    sessionStorage.getItem("bked") == null ||
    sessionStorage.getItem("bked") == NaN ||
    sessionStorage.getItem("bked") >= 99
  ) {
    bked = 0;
    sessionStorage.setItem("bked", bked);
    console.log(sessionStorage.getItem("bked"));
  } else {
    sessionStorage.setItem("bked", bked);
    console.log(sessionStorage.getItem("bked"));
  }
});

window.addEventListener("dblclick", (event) => {
  reset();
});

var dy = 0;

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  document.body.addEventListener("touchend", dbtap());
  document.querySelector("button").addEventListener("touchmove", () => {
    if (dy == 0) {
      bked = sessionStorage.getItem("bked");
      theme(bked);
      bked++;

      document.querySelector("button").addEventListener("touchend", () => {
        if (
          sessionStorage.getItem("bked") == null ||
          sessionStorage.getItem("bked") == NaN ||
          sessionStorage.getItem("bked") >= 99
        ) {
          bked = 0;
          sessionStorage.setItem("bked", bked);
          console.log(sessionStorage.getItem("bked"));
        } else {
          sessionStorage.setItem("bked", bked);
          console.log(sessionStorage.getItem("bked"));
        }
        
        dy = 1;
      });
    } else {
      bked = sessionStorage.getItem("bked");
      theme(bked);
      bked++;

      document.querySelector("button").addEventListener("touchend", () => {
        if (
          sessionStorage.getItem("bked") == null ||
          sessionStorage.getItem("bked") == NaN ||
          sessionStorage.getItem("bked") >= 99
        ) {
          bked = 0;
          sessionStorage.setItem("bked", bked);
          console.log(sessionStorage.getItem("bked"));
        } else {
          sessionStorage.setItem("bked", bked);
          console.log(sessionStorage.getItem("bked"));
        }
        
        dy = 0;
      });
    }
  });

  document.querySelector("#burg").ontouchend = function () {
    if (burged % 2 == 0) {
      gsap.to(document.querySelector(".sidepop"), {
        opacity: 1,
        pointerEvents: "all",
        width: "100%",
        duration: 0.5,
      });
    } else {
      gsap.to(document.querySelector(".sidepop"), {
        opacity: 0,
        width: "0%",
        pointerEvents: "none",
        duration: 0.5,
      });
    }
    console.log("burged " + burged);

    burged++;
  };
} else if (/Windows|Macintosh|Linux/i.test(navigator.userAgent)) {
  document.querySelector("#burg").onclick = function () {
    if (burged % 2 == 0) {
      gsap.to(document.querySelector(".sidepop"), {
        opacity: 1,
        pointerEvents: "all",
        width: "100%",
        duration: 0.5,
      });
    } else {
      gsap.to(document.querySelector(".sidepop"), {
        opacity: 0,
        width: "0%",
        pointerEvents: "none",
        duration: 0.5,
      });
      document.querySelector("#burg").style.setProperty("background-color", "var(--white)")
    }
    burged++;
  };
  document.querySelector("#burg").ontouchend = function () {
    document.querySelector("#burg").style.setProperty("background-color", "var(--white)")
  }
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

function theme(bkeds) {
  if (bkeds % 2 == 0) {
    document.querySelector(":root").style.setProperty("--black", "#ffffff");
    document.querySelector(":root").style.setProperty("--hili", "#ffffff");
    document
      .querySelector(":root")
      .style.setProperty("--blue", "rgb(70, 243, 234)");
    document
      .querySelector(":root")
      .style.setProperty("--hilb", "rgb(77, 219, 212)");
    document
      .querySelector(":root")
      .style.setProperty("--activeb", "rgb(77, 219, 212)");
    document.querySelector(":root").style.setProperty("--active", "#ffffff");
    document.querySelector(":root").style.setProperty("--font", "#000000");
    document
      .querySelector(":root")
      .style.setProperty("--bod", "rgb(255, 255, 255)");
    document.querySelector(":root").style.setProperty("--nav", "#ffffff");
  } else {
    document.querySelector(":root").style.setProperty("--black", "#000000");
    document.querySelector(":root").style.setProperty("--hili", "#000000");
    document
      .querySelector(":root")
      .style.setProperty("--blue", "rgb(70, 243, 234)");
    document.querySelector(":root").style.setProperty("--hilb", "#ececec");
    document
      .querySelector(":root")
      .style.setProperty("--activeb", "rgb(44, 44, 44)");
    document
      .querySelector(":root")
      .style.setProperty("--active", "rgb(70, 243, 234)");
    document.querySelector(":root").style.setProperty("--font", "#ececec");
    document.querySelector(":root").style.setProperty("--bod", "#1b1b1b");
    document
      .querySelector(":root")
      .style.setProperty("--nav", "rgb(44, 44, 44)");
  }
}

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

function mbHold() {
  document.querySelector("#burg").style.setProperty("background-color", )
}