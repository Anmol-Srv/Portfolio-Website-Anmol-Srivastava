import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";



//============================================================================================================================


const ob = document.querySelector(".web-gl5");
const canvasLength = document.querySelector(".canvaselement5");
const renderer = new THREE.WebGL1Renderer({
    canvas: ob,
    antialias: false,
    // alpha: true
});
// const loader = new THREE.TextureLoader();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.shadowMap.enabled = true;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    // window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 5);
orbit.update();
const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);
// const spotlight = new THREE.SpotLight();
// scene.add(spotlight);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}



//------------------------------------------------------------------------------------------



const path = new URL("../Models/saturn.glb", import.meta.url)

const particlesGeo = new THREE.BufferGeometry();
const particleCount = 10000;
const particleMat = new THREE.PointsMaterial(
    { size: 0.005 }
);
const posArr = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    posArr[i] = (Math.random() - 0.5) * 10;
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
const particleMesh = new THREE.Points(particlesGeo, particleMat);
scene.add(particleMesh);


const geometry = new THREE.PlaneGeometry(7, 5, 15, 9);
// const material = new THREE.MeshBasicMaterial({
    // color:0xff0000,
    // wireframe:true,
    // map: loader.load(url)
// })
// const flag = new THREE.Mesh(geometry, material);
// flag.scale.set(0.7, 0.7, 0.7)
// flag.rotation.set(0, -0.5, 0)
// flag.position.set(3, 0, 0)
// scene.add(flag);


const loader = new GLTFLoader();
loader.load(
  path.href,
  function (gltf) {
    let model = gltf.scene;
    scene.add(model);
    model.position.set(0,0,0);
    model.scale.set(0.5, 0.5, 0.5);
  },
  undefined,
  (error) => {
    console.log(error);
  }
);

document.addEventListener("mousemove",particleAnimate);

let mouseX = 0;
let mouseY = 0;

function particleAnimate(event){
    mouseX=event.clientY;
    mouseY=event.clientX;
}


const count = geometry.attributes.position.count;
const clock = new THREE.Clock();
const objs = []
const animate = () => {
    const time = clock.getElapsedTime();

    particleMesh.rotation.y=mouseX * (time * 0.00005);
    particleMesh.rotation.x=mouseY * (time * 0.00005);

    //wave animation
    // for (var i = 0; i < count; i++) {
    //     const x = geometry.attributes.position.getX(i);
    //     const y = geometry.attributes.position.getY(i);
    //     //animations
    //     const anim1 = 0.25 * Math.sin(x * 2 + time * 3);
    //     const anim2 = 0.25 * Math.sin(x * 1 + time * 3);
    //     // const anim3= 0.75 *Math.sin(y * 2 + time * 0.7);

    //     geometry.attributes.position.setZ(i, anim1 + anim2);
    //     geometry.computeVertexNormals();
    //     geometry.attributes.position.needsUpdate = true;
    // }
    //raycaster
    // raycaster.setFromCamera(pointer, camera);
    // const intersects = raycaster.intersectObjects(scene.children);

    // for ( let i = 0; i < intersects.length; i ++ ) {



    // }

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

animate();




window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}



//Email portion
var form = document.getElementById("form")

form.addEventListener('submit',function(event)
{
    event.preventDefault();
    var params={
        from_name : document.getElementById("name").value,
        email_id : document.getElementById("email").value,
        message : document.getElementById("message").value
    }
    emailjs.sendForm("service_3n056ad","template_ljxitk3",params).then(function(res){
        alert("Mail Sent Succesfully!" + res.status);
    })
})
