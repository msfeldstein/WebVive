var Shapes = require('./shapes')
var Tween = require('tween.js')
var defineProperty = require('./defineProperty')

var OBJECT_SPACING = 0.2

var Palette = function(controller, options) {
  options = options || {}


  this.container = new THREE.Group()
  this.container.position.z = -.2
  controller.add(this.container)
  this.scrollPosition = 0
  this.prototypes = []
  if (options.prototypes) {
    this.prototypes = options.prototypes
  } else {
    var shapes = Shapes()
    var i = 0
    shapes.forEach((shape) => {
      var bbox = new THREE.Box3().setFromObject(shape)
      var size = bbox.size()
      var largest = Math.max(size.x, size.y, size.z)
      var scale = 0.1 / largest
      shape.scale.set(scale, scale, scale)
      this.container.add(shape)
      shape.position.x = OBJECT_SPACING * i
      this.prototypes.push(shape)
      shape.material.opacity = 0
      i ++
    })
  }

  controller.Events.on(controller.Events.PadTouched, this.onPadTouched.bind(this))
  controller.Events.on(controller.Events.PadUntouched, this.onPadUntouched.bind(this))

  controller.Events.on(controller.Events.PadDragged, function(dx, dy) {
    this.scrollPosition += dx
  }.bind(this))

  var update = function(time) {
    requestAnimationFrame(update)
    Tween.update(time)
  }
  requestAnimationFrame(update)
}

Palette.prototype.onPadTouched = function() {
  console.log(Object.keys(this))
  for (var i = 0; i < this.prototypes.length; i++) {
    var shape = this.prototypes[i]
    var tween = new Tween.Tween(shape.material)
      .to({opacity: 1}, 200)
      .delay(40 * i)
      .start()
  }
  clearTimeout(this.hideTimer)
}

Palette.prototype.onPadUntouched = function() {
  var closest = Math.round(-this.scrollPosition)
  console.log(closest, this.scrollPosition / OBJECT_SPACING)
  closest = Math.max(0, closest)
  closest = Math.min(this.prototypes.length , closest)
  new Tween.Tween(this)
    .to({scrollPosition: -closest * OBJECT_SPACING}, 200)
    .start()
  this.hideTimer = setTimeout(this.hide.bind(this), 2000)
}

Palette.prototype.hide = function() {
  for (var i = 0; i < this.prototypes.length; i++) {
    var shape = this.prototypes[i]
    var tween = new Tween.Tween(shape.material)
      .to({opacity: 0}, 200)
      .start()
  }
}

Object.defineProperty(Palette.prototype, 'scrollPosition', {
  get: function() { return this._scrollPosition || 0},
  set: function(p) {
    this._scrollPosition = p
    this.container.position.x = p
  },
  enumerable: true
})

module.exports = Palette
