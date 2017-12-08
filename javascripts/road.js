var scene, camera, renderer, container;

var road;
var speed;
var posX; // Right & Left
var move;

function init()  {
  speed = 0.005;
  posX = 1;
  move = 1;
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 10000 );
  camera.position.set(0, 10, 4);

  var geometry = new THREE.SphereGeometry(10, 200, 200);
  var tex_road = new THREE.TextureLoader().load('textures/road3.png');
  var mat_road = new THREE.MeshBasicMaterial( { map: tex_road } );
  //var material = new THREE.MeshBasicMaterial( {color: 0x00000, wireframe: true} );

  road = new THREE.Mesh( geometry, mat_road );
  road.rotation.z = 3.1415/2;
  scene.add(road);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  renderer.autoClear = false;
  renderer.setClearColor( 0xdddddd, 1);

  render();
}

function animate() {
  requestAnimationFrame(animate);

  let variables = processFrame(leapController.frame());

  updateSpeed(variables.forward);
  updatePosition(variables.direction);
  render();
}

function updateSpeed(dx) {
    road.rotation.x += speed * dx;
}

function updatePosition(dx) {
  camera.position.x = dx/2;
}



function render() {
  renderer.clear();
  renderer.clearDepth();
  renderer.render(scene, camera);
}
