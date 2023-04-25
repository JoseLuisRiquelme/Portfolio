import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'



//container(cameras and lights)
const scene= new THREE.Scene();
//now we need a camera
 //perspective camera mimic the humans eyes( first parameter is the field of view,aspect ratio,view frustum)
const camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
//now create render that make the magic happen, this need to know what DOM elements use
const renderer= new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});
//pixel ratio of device
renderer.setPixelRatio(window.devicePixelRatio);
//render size is the window size
renderer.setSize(window.innerWidth,window.innerHeight);
//camera position in the scene moving throughtout the z axis
camera.position.setZ(-20);
camera.position.setX(30);
camera.position.setY(50)
//then we call the render method (render=draw)
renderer.render(scene,camera);
//add objects there are three basics steps(1.geometry/2.-material/3.-mesh)

//sun texture
const sunTexture= new THREE.TextureLoader().load('sun5.jpg'); 
const marsTexture= new THREE.TextureLoader().load('mars2.jpg');
const earthTexture= new THREE.TextureLoader().load('earth.jpg');
const moonTexture= new THREE.TextureLoader().load('moon.jpg');

//1.-geometry(vector define the objets inself)
const geometry= new THREE.SphereGeometry( 13, 32, 16)
//2.-material(wrapping the object)(custom shaders with WebGL)
//const material= new THREE.MeshBasicMaterial({color:0xff6347,wireframe:true})
const material= new THREE.MeshStandardMaterial({map:sunTexture})
//3.-mesh(geometry+material)
const sun= new THREE.Mesh(geometry,material);
scene.add(sun)
//Mars--
const geometry1 = new THREE.SphereGeometry( 5, 32, 16 );
const material1 = new THREE.MeshBasicMaterial( { map:marsTexture} );
const mars = new THREE.Mesh( geometry1, material1 );
mars.position.set(25,25,15)
scene.add( mars );

//Earth--
const geometry2 = new THREE.SphereGeometry( 8, 32, 16 );
const material2 = new THREE.MeshBasicMaterial( { map:earthTexture} );
const earth = new THREE.Mesh( geometry2, material2 );
earth.position.set(-25,-25,60)
scene.add( earth );
//Moon--
const geometry3 = new THREE.SphereGeometry( 3, 32, 16 );
const material3 = new THREE.MeshBasicMaterial( { map:moonTexture} );
const moon = new THREE.Mesh( geometry3, material3 );
moon.position.set(-25,-25,70)
scene.add( moon );


//light point
const pointLight= new THREE.PointLight(0xFFFFFF)

//ambient light
const ambienLight=new THREE.AmbientLight(0xFFFFFF)
scene.add(pointLight,ambienLight)
//helper
//const light = new THREE.DirectionalLight( 0xFFFFFF );
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add( lightHelper );
//grid helper
//const gridHelper=new THREE.GridHelper(200,50);
//scene.add(gridHelper)
//add something positionally to the scene
function addStart(){
  const geometry= new THREE.SphereGeometry(0.25,24,24)
  const material= new THREE.MeshStandardMaterial({color:0xffffff});
  const star= new THREE.Mesh(geometry,material);

  const[x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(500));

  star.position.set(x,y,z);
  scene.add(star)
}
Array(300).fill().forEach(addStart)
function addPlanet(){
  const planetTexture= new THREE.TextureLoader().load('space2.jpg')
  const geometry= new THREE.SphereGeometry(5,24,24)
  const material= new THREE.MeshStandardMaterial({map:planetTexture});
  const planet= new THREE.Mesh(geometry,material);

  const[x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(400));

  planet.position.set(x,y,z);
  scene.add(planet)
}
Array(9).fill().forEach(addPlanet)


//space texture
const textureLoader= new THREE.TextureLoader().load('space2.jpg');
scene.background = textureLoader;

//avatar
const jlTexture=new THREE.TextureLoader().load('jl.jpg');
const jl= new THREE.Mesh(
  new THREE.CircleGeometry( 3,32 ),new THREE.MeshBasicMaterial( {map:jlTexture, side: THREE.DoubleSide} )
);
jl.position.set(15,5,15)
scene.add(jl)
//positions of the light
pointLight.position.set(5,5,5)
//orbits controls
const controls= new OrbitControls(camera,renderer.domElement);
//loop to animate
function animate(){
  requestAnimationFrame(animate);
  mars.rotation.x+=0.001;
  mars.rotation.y+=0.007;
  mars.rotation.z+=0.01;
  jl.rotation.y+=0.005

  earth.rotation.x+=0.001;
  earth.rotation.y+=0.007;
 // earth.rotation.z+=0.01;
 moon.rotation.x+=0.001;
  moon.rotation.y+=0.007;
  moon.rotation.z+=0.01;
  controls.update()

  renderer.render(scene,camera);
}
animate()

function moveCamara(){
const t = document.body.getBoundingClientRect().bottom;
sun.rotation.x+=0.001;
  sun.rotation.y+=0.005;
  sun.rotation.z+=0.002;
  
camera.position.setZ(20);
camera.position.setX(-10);
camera.position.setY(-30)
  

camera.position.z = t * -0.005;
camera.position.x = t * -0.2;
camera.rotation.y = t * -0.8;



}
document.body.onscroll=moveCamara
