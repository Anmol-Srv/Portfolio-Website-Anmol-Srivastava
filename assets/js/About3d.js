import * as THREE from "three";

const ob = document.querySelector(".web-gl2");
const canvasLength = document.querySelector(".canvaselement2");
const renderer = new THREE.WebGL1Renderer({
  canvas: ob,
  antialias: true,
//   alpha: true,
});

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
camera.position.set(0, 0, 1);

const ambientLight = new THREE.HemisphereLight(0xffffff, 0x000000, 10);
scene.add(ambientLight);

const spotlight = new THREE.SpotLight();
scene.add(spotlight);

const particlesGeo = new THREE.BufferGeometry();
const particleCount = 10000;
const particleMat = new THREE.PointsMaterial(
    {size:0.005}
);
const posArr = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
posArr[i]= (Math.random() - 0.5) * 10 ;
}

particlesGeo.setAttribute('position',new THREE.BufferAttribute(posArr,3));
const particleMesh = new THREE.Points(particlesGeo,particleMat);
scene.add(particleMesh);


const pointsLight = new THREE.PointLight(0xffffff , 0.1)
pointsLight.position.x=2
pointsLight.position.y=3
pointsLight.position.z=4
scene.add(pointsLight);


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
        particleMesh.rotation.x=mouseY * (ElapsedTime * 0.0005);
        particleMesh.rotation.y=mouseX * (ElapsedTime * 0.0005);
        
        renderer.render(scene , camera);
        window.requestAnimationFrame(tick);
}

tick();




import gsap from 'gsap';
    
gsap.from(".text h1",{
    duration: 3,
    y : -100,
    ease : "elastic.out(1,0.2)"
})
gsap.from(".text p",{
    delay:.75,
    duration: 3,
    opacity:0,
    y : -100,
    ease : "elastic.out(1,0.2)"
})
gsap.from(".image",{
    delay:1,
    duration: 3,
    opacity:0,
    y : -100,
    ease : "elastic.out(1,0.2)"
})

document.addEventListener("mousemove",function(event)
{
    var width=window.innerWidth,
    height = window.innerHeight,
    positionX = (event.clientX/width) - 0.55,
    positionY = (event.clientY/height) - 0.55;

    gsap.to(".image img,.glow", {
        rotationY:positionX * 90,
        rotationX:-positionY * 90,
        ease:"none"

    })

})
