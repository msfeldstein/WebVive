module.exports = function(controls, scene) {
  var controller1 = new THREE.ViveController(0, controls)
  scene.add(controller1)

  var controller2 = new THREE.ViveController(1, controls)
  scene.add(controller2)

  
  return [controller1, controller2]
}
