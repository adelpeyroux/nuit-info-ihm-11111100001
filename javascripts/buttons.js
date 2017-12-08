
var renderer;

var initRenderer = function() {
  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  
  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.BasicShadowMap;


  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = 0;
  renderer.domElement.style.left = 0;
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';

  document.body.appendChild(renderer.domElement);
};

var initScene = function (menu) {
  Physijs.scripts.worker = '../javascripts/lib/physijs_worker.js';
  var scene = new Physijs.Scene();
  scene.addEventListener('update', function() {
    scene.simulate( undefined, 1 );
  });
  
  scene.setGravity({x:0,y:0,z:0});

  
  var widgets = new LeapWidgets(scene);
  widgets.initLeapHand();

  widgets.createLabel("LeapJS Widgets - Buttons", new THREE.Vector3(0, 120, -110), 16, 0xffffff);
  var counterLabel = widgets.createLabel("0", new THREE.Vector3(0, 0, -110), 16, 0xffffff);
  var wall = widgets.createWall(new THREE.Vector3(0, 0, -200), new THREE.Vector3(500, 300, 100));

  var i = 0;
  for (var elt in menu) {
    var button = widgets.createButton(elt, new THREE.Vector3(-150 + (i * 75 * 3 / 2), 0, -110), new THREE.Vector3(75, 70, 30));
    button.addEventListener('press', function(evt) {
      console.log("tamere");
    });
    i++;
  }

  var spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.shadowCameraVisible = true;
  spotLight.castShadow = true;
  spotLight.shadowMapWidth = 6048;
  spotLight.shadowMapHeight = 6048;
  
  spotLight.shadowCameraFar = 1000;
  spotLight.shadowDarkness = 0.5;
  spotLight.position.fromArray([wall.position.x, wall.position.y, wall.position.z + 1000]);
  spotLight.target.position.copy(wall.position);
  scene.add(spotLight);

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.fromArray([0, 0, 300]);
  camera.lookAt(new THREE.Vector3(0,0,0));

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }, false);

  scene.add(camera);
};

var initScenes = function () {
  initRenderer();
  initScene(menu);
};

initScenes();
