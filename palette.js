var Shapes = require('./shapes')
var Tween = require('tween.js')

module.exports = function(controller, options) {
  options = options || {}

  var container = new THREE.Group()
  container.position.z = -.2
  controller.add(container)
  var prototypes = []
  if (options.prototypes) {
    prototypes = options.prototypes
  } else {
    var shapes = Shapes()
    var i = 0
    shapes.forEach((shape) => {
      var bbox = new THREE.Box3().setFromObject(shape)
      var size = bbox.size()
      var largest = Math.max(size.x, size.y, size.z)
      var scale = 0.1 / largest
      shape.scale.set(scale, scale, scale)
      container.add(shape)
      shape.position.x = .2 * i
      prototypes.push(shape)
      shape.material.opacity = 0
      i ++
    })
  }

  controller.Events.on(controller.Events.PadTouched, function() {
    for (var i = 0; i < prototypes.length; i++) {
      var shape = prototypes[i]
      var tween = new Tween.Tween(shape.material)
        .to({opacity: 1}, 200)
        .delay(40 * i)
        .start()
    }
  })

  controller.Events.on(controller.Events.PadUntouched, function() {
    for (var i = 0; i < prototypes.length; i++) {
      var shape = prototypes[i]
      var tween = new Tween.Tween(shape.material)
        .to({opacity: 0}, 200)
        .start()
    }
  })

  controller.Events.on(controller.Events.PadDragged, function(dx, dy) {
    container.position.x += dx
  })

  var update = function(time) {
    requestAnimationFrame(update)

  }
  requestAnimationFrame(update)
}
