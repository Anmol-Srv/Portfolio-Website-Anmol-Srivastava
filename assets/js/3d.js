import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "dat.gui";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ob = document.querySelector(".web-gl");
const canvasLength = document.querySelector(".canvaselement");
const renderer = new THREE.WebGL1Renderer({
  canvas: ob,
  antialias: true,
  // alpha: true,
});
// const path = new URL("../Models/i_am_error.glb", import.meta.url);

// renderer.setSize(canvasLength.offsetWidth, canvasLength.offsetHeight);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

renderer.shadowMap.enabled = true;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  // canvasLength.offsetWidth / canvasLength.offsetHeight,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// const orbit = new OrbitControls(camera, renderer.domElement);

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

camera.position.set(0, 0, 1);
// orbit.update();

// const ambientLight = new THREE.HemisphereLight(0xffffff, 0x000000, 10);
// scene.add(ambientLight);

// const spotlight = new THREE.SpotLight();
// scene.add(spotlight);

// const torus = new THREE.DodecahedronGeometry();
const torus = new THREE.TorusGeometry(0.7,0.2,16,100);
const torusMat = new THREE.PointsMaterial(
    {size:0.005}
);
const Torus = new THREE.Points(torus,torusMat);
Torus.position.set(0.75,0,0);
scene.add(Torus);

const particlesGeo = new THREE.BufferGeometry();
const particleCount = 3000;
const posArr = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
posArr[i]= (Math.random() - 0.5) * 10 ;
}

particlesGeo.setAttribute('position',new THREE.BufferAttribute(posArr,3));
const particleMesh = new THREE.Points(particlesGeo,torusMat);
scene.add(particleMesh);


const pointsLight = new THREE.PointLight(0xffffff , 0.1)
pointsLight.position.x=2
pointsLight.position.y=3
pointsLight.position.z=4
scene.add(pointsLight);

// const loader = new GLTFLoader();
// loader.load(
//   path.href,
//   function (gltf) {
//     const model = gltf.scene;
//     scene.add(model);
//     // model.position.set(-2,0,0);
//     model.scale.set(0.1, 0.1, 0.1);
//   },
//   undefined,
//   (error) => {
//     console.log(error);
//   }
// );

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

document.addEventListener("mousemove",particleAnimate);

let mouseX = 0;
let mouseY = 0;

function particleAnimate(event){
    mouseX=event.clientY;
    mouseY=event.clientX;
}
const clock = new THREE.Clock();
    
    const tick = ()=>
    {
        const ElapsedTime = clock.getElapsedTime();
        Torus.rotation.y= .5 * ElapsedTime;
        particleMesh.rotation.x=mouseY * (ElapsedTime * 0.0005);
        particleMesh.rotation.y=mouseX * (ElapsedTime * 0.0005);
        
        renderer.render(scene , camera);
        window.requestAnimationFrame(tick);
}

tick();


