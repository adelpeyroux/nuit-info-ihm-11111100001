var scene, camera, renderer, container;

var hudScene, hudCamera;

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
  hudScene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 10000 );
  camera.position.set(0, 10, 100);

  hudCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2,
      window.innerHeight / 2, window.innerHeight / -2, 0.1, 1000);
  hudCamera.position.z = 1;

  var geometry = new THREE.SphereGeometry(10, 200, 200);
  var tex_road = new THREE.TextureLoader().load('textures/text27.png');
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
  scene.add(road);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  renderer.autoClear = false;
  renderer.setClearColor( 0xdddddd, 1);

  // Sound things
  var listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  var sound = new THREE.Audio( listener );
  var audioLoader = new THREE.AudioLoader();
  //Load a sound and set it as the Audio object's buffer
  audioLoader.load( 'sounds/theme.mp3', function( buffer ) {
  sound.setBuffer( buffer );
  sound.setLoop( true );
  sound.setVolume( 0.5 );
  sound.play();
  });


  var loader = new THREE.FontLoader();

  loader.load( 'fonts/retro.json', function ( font ) {
  	var textGeo = new THREE.TextGeometry( 'Ready ?', {
  		font: font,
  		size: 1,
      height: 10
  	} );

    var textMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

    textMesh = new THREE.Mesh( textGeo, textMaterial );
    textMesh.position.set(-10, 0, 0);
    hudScene.add( textMesh );
  } );

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
}

function updatePosition(dx) {
  camera.position.x = dx/1.3;
}



function render() {
  renderer.clear();
  renderer.clearDepth();
  renderer.render(scene, camera);

  renderer.clearDepth();
  renderer.render(hudScene, hudCamera);
}
