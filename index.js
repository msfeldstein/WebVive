window.THREE = require('THREE')
require('./ViveController')
require('./VRControls')
require('./VREffect')
require('./OBJLoader')
var TrackballControls = require('three-trackballcontrols')
WEBVR = require('./WEBVR')
document.body.style.margin = 0

var camera, scene, renderer;
var effect, controls;
var controller1, controller2;
var room;
var USE_HMD = false;

init();
animate();

function init() {
  container = document.createElement('div')
  document.body.appendChild(container)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10)
  scene.add(camera)
  camera.position.z = -2

  room = new THREE.Mesh(
    new THREE.BoxGeometry(6, 6, 6, 10, 10, 10),
    new THREE.MeshBasicMaterial({color: 0x202020, wireframe: true})
  )

  room.position.y = 3
  scene.add(room)
  scene.add(new THREE.HemisphereLight(0x404020, 0x202040, 0.5))
  var light = new THREE.DirectionalLight(0xffffff)
  light.position.set(1, 1, 1).normalize()
  scene.add(light)

  renderer = require('./renderer')
  container.appendChild(renderer.domElement)


  controls = new THREE.VRControls(camera)
  controls.standing = true

  var controllers = require('./setup-controllers')(controls, scene);
  controller1 = controllers[0]
  controller1.onPadTouched = function() {
    console.log("Touched")
  }
  controller1.Events.on(controller1.Events.PadTouched, () => {
    console.log("Pad was touched")
  })
  controller1.Events.on(controller1.Events.PadUntouched, () => {
    console.log("Pad was untouched")
  })
  controller1.Events.on(controller1.Events.MenuClicked, () => {
    console.log("Trigger")
  })

  controller2 = controllers[1]

  if (!USE_HMD) {
    controls = new TrackballControls(camera)
  }

  if (USE_HMD) effect = new THREE.VREffect(renderer)
    document.body.appendChild(WEBVR.getButton(effect))
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function render() {
  controls.update()
  
  if (USE_HMD) {
    effect.render(scene, camera)
  } else {
    camera.position = controller1.position
    // camera.position.z -= 10
    // camera.lookAt(controller1)
    renderer.render(scene, camera)
  }
}
