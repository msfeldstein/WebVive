module.exports = function(controls, scene) {
  var controller1 = new THREE.ViveController(0)
  controller1.standingMatrix = controls.getStandingMatrix()
  scene.add(controller1)

  var controller2 = new THREE.ViveController(1)
  controller2.standingMatrix = controls.getStandingMatrix()
  scene.add(controller2)

  var vivePath = '/assets/vr_controller_vive_1_5.obj'
  var loader = new THREE.OBJLoader()
  loader.load(vivePath, (object) => {
    var loader = new THREE.TextureLoader()
    controller = object.children[0]
    controller.material.map = loader.load('/assets/onepointfive_texture.png')
    controller.material.specularMap = loader.load('/assets/onepointfive_spec.png')
    controller1.add(object.clone())
    controller2.add(object.clone())
  })
  return [controller1, controller2]
}
