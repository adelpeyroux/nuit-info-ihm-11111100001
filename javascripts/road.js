var scene, camera, renderer, container;

var road, tree;
var speed;
var posX; // Right & Left
var move;

var treesTex = [
  'textures/tree1.png',
  'textures/tree2.png',
  'textures/tree3.png',
  'textures/tree4.png'
];

var sgn = [1, -1];

var createTree = function () {
  let texIndex = Math.round(Math.random() * 3);

  let file = treesTex[texIndex];

  let geometry = new THREE.Geometry();

  var a = { x:-1,
            y:0 };
  var b = { x:1,
            y:3 };
  
  geometry.vertices.push( new THREE.Vector3( a.x, a.y, 0 ) );
  geometry.vertices.push( new THREE.Vector3( b.x, a.y, 0 ) );
  geometry.vertices.push( new THREE.Vector3( b.x, b.y, 0 ) );
  geometry.vertices.push( new THREE.Vector3( a.x, b.y, 0 ) );

  geometry.faces.push( new THREE.Face3( 0, 1, 2 ) ); // counter-clockwise winding order
  geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );

  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  var tex = new THREE.TextureLoader().load(file);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;

  var mat = new THREE.MeshBasicMaterial( { map: tex } );
  let tree = new THREE.Mesh( geometry, mat );

  return tree;
};

function init()  {
  speed = 0.02;
  posX = 1;
  move = 1;
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 10000 );
  camera.position.set(0, 10, 40);

  var geometry = new THREE.SphereGeometry(10, 200, 200);
  var tex_road = new THREE.TextureLoader().load('textures/text26.png');
  tex_road.magFilter = THREE.NearestFilter;
  tex_road.minFilter = THREE.NearestFilter;
  var mat_road = new THREE.MeshBasicMaterial( { map: tex_road } );
  //var material = new THREE.MeshBasicMaterial( {color: 0x00000, wireframe: true} );

  tree = createTree();
  
  let alpha = (Math.random() + 1.5) * sgn[Math.round(Math.random())];
  tree.position.set(0, alpha, -7);
  tree.rotation.x = -3.1415/2;

  
  
  
  
  road = new THREE.Mesh( geometry, mat_road );
  road.rotation.z = 3.1415/2;

  road.add(tree);
  scene.add(tree);

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
  tree.matrixWorld = tree.matrixWorld.multiply(new THREE.Matrix4().makeRotationX(tree.rotation.x + speed * dx));
}

function updatePosition(dx) {
  camera.position.x = dx/1.3;
}



function render() {
  renderer.clear();
  renderer.clearDepth();
  renderer.render(scene, camera);
}
