import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import sunjpg from './textures/sun5.jpg'
import marsjpg from './textures/mars2.jpg'
import earthjpg from './textures/earth.jpg'
import moonjpg from './textures/moon.jpg'
import spacejpg from './textures/space2.jpg'
import jljpg from './textures/jl.jpg'
import purplejpg from './textures/black2.jpg'
import uranojpg from './textures/urano7.jpg'
import ringjpg from './textures/ringtexture.jpg'




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

//camera position in the scene 
camera.position.setZ(-20);
camera.position.setX(30);
camera.position.setY(50)

//then we call the render method (render=draw)
renderer.render(scene,camera);


//add objects there are three basics steps(1.geometry/2.-material/3.-mesh)

//custome textures
const sunTexture= new THREE.TextureLoader().load(sunjpg); 
const marsTexture= new THREE.TextureLoader().load(marsjpg);
const earthTexture= new THREE.TextureLoader().load(earthjpg);
const moonTexture= new THREE.TextureLoader().load(moonjpg);
const saturnoTexture= new THREE.TextureLoader().load(purplejpg);
const uranoTexture= new THREE.TextureLoader().load(uranojpg);
const ringTexture= new THREE.TextureLoader().load(ringjpg);

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
earth.position.set(-35,-25,60)
scene.add( earth );

//Moon--
const geometry3 = new THREE.SphereGeometry( 3, 32, 16 );
const material3 = new THREE.MeshBasicMaterial( { map:moonTexture} );
const moon = new THREE.Mesh( geometry3, material3 );
moon.position.set(-25,-25,70)
scene.add( moon );

//Saturno--
const geometry4 = new THREE.SphereGeometry( 13, 32, 16 );
const material4 = new THREE.MeshBasicMaterial( { map:saturnoTexture} );
const saturno = new THREE.Mesh( geometry4, material4 );
saturno.position.set(300,-20,-10)
scene.add( saturno );

//Urano--
const geometry5 = new THREE.SphereGeometry( 70, 32, 16 );
const material5 = new THREE.MeshBasicMaterial( { map:uranoTexture} );
const urano= new THREE.Mesh( geometry5, material5 );
urano.position.set(600,50,230)
scene.add(urano);

//Urano(saturno) ring1--
const geometry6 = new THREE.RingGeometry( 90, 72, 50 );
const material6 = new THREE.MeshBasicMaterial( { map:ringTexture, side: THREE.DoubleSide } );
const uranoRing1 = new THREE.Mesh( geometry6, material6 );
uranoRing1.position.set(600,50,230)
uranoRing1.rotation.x = Math.PI / 3;

//Urano ring2--
const geometry7 = new THREE.RingGeometry( 150, 100, 50 );
const material7 = new THREE.MeshBasicMaterial( { map:ringTexture, side: THREE.DoubleSide } );
const uranoRing2 = new THREE.Mesh( geometry7, material7 );
uranoRing2.position.set(600,50,230)
uranoRing2.rotation.x = Math.PI / 3;

scene.add( uranoRing1,uranoRing2 );


//light point
const pointLight= new THREE.PointLight(0xFFFFFF)

//ambient light
const ambienLight=new THREE.AmbientLight(0xFFFFFF)
scene.add(pointLight,ambienLight)


//helper


//const light = new THREE.DirectionalLight( 0xFFFFFF );
//const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add( lightHelper );
//grid helper
//const gridHelper=new THREE.GridHelper(200,50);
//scene.add(gridHelper)
//const axesHelper = new THREE.AxesHelper( 35 );
//scene.add( axesHelper );
//add something positionally to the scene

function addStart(){

  const geometry= new THREE.SphereGeometry(0.25,24,24)
  const material= new THREE.MeshStandardMaterial({color:0xffffff});
  const star= new THREE.Mesh(geometry,material);

  const[x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(600));

  star.position.set(x,y,z);
  scene.add(star)
}
Array(300).fill().forEach(addStart)

function addPlanet(){
  const planetTexture= new THREE.TextureLoader().load(spacejpg )
  const geometry= new THREE.SphereGeometry(5,24,24)
  const material= new THREE.MeshStandardMaterial({map:planetTexture});
  const planet= new THREE.Mesh(geometry,material);

  const[x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(600));

  planet.position.set(x,y,z);
  scene.add(planet)
}
Array(9).fill().forEach(addPlanet)


//space texture
const textureLoader= new THREE.TextureLoader().load(spacejpg);
scene.background = textureLoader;

//avatar1
const jlTexture=new THREE.TextureLoader().load(jljpg );
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
  urano.rotation.y+=0.01
  uranoRing1.rotation.z+=0.001
  uranoRing2.rotation.z+=-0.001

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
  saturno.rotation.y+=0.01
  
  camera.position.setZ(20);
  camera.position.setX(-10);
  camera.position.setY(-30)
  

  camera.position.z = t * -0.005;
  camera.position.x = t * -0.2;
  camera.rotation.y = t * -0.8;

}
document.body.onscroll=moveCamara
