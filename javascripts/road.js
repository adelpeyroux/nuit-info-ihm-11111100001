var scene, camera, renderer, container;

var road, trees;
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
  geometry.faceVertexUvs[0].push([
    new THREE.Vector2(0,0),
    new THREE.Vector2(1,0),
    new THREE.Vector2(1,1)
  ]);
  geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );
  geometry.faceVertexUvs[0].push([
    new THREE.Vector2(0,0),
    new THREE.Vector2(1,1),
    new THREE.Vector2(0,1)
  ]);

  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  geometry.uvsNeedUpdate = true;
  

  var tex = new THREE.TextureLoader().load(file);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;

  var mat = new THREE.MeshBasicMaterial( { map: tex , transparent: true} );
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
  camera.position.set(0, 10, 4);

  var geometry = new THREE.SphereGeometry(10, 200, 200);
  var tex_road = new THREE.TextureLoader().load('textures/text26.png');
  tex_road.magFilter = THREE.NearestFilter;
  tex_road.minFilter = THREE.NearestFilter;
  var mat_road = new THREE.MeshBasicMaterial( { map: tex_road } );
  //var material = new THREE.MeshBasicMaterial( {color: 0x00000, wireframe: true} );

  road = new THREE.Mesh( geometry, mat_road );
  road.rotation.z = 3.1415/2;

  trees = new THREE.Group();

  for (let i = 0; i < 47; ++i) {
    tree = createTree();
    
    let alpha = (1.6) * sgn[Math.round(Math.random())];

    let angle = Math.random() * 2 * 3.1415;
    
    tree.position.set(alpha, - 9 * Math.sin(-angle), 9 * Math.cos(angle));
    tree.rotation.x = 3.1415/2 - angle;
    //tree.rotation.y = -3.1415/2;
    
    

    trees.add(tree);
  }

  
  scene.add(road);
  scene.add(trees);

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
  road.applyMatrix(new THREE.Matrix4().makeRotationX( speed * dx));
  trees.applyMatrix(new THREE.Matrix4().makeRotationX( speed * dx));
}

function updatePosition(dx) {
  camera.position.x = dx/1.3;
}



function render() {
  renderer.clear();
  renderer.clearDepth();
  renderer.render(scene, camera);
}
