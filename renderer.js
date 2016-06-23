var renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor(0x101010)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.sortObjects = false

module.exports = renderer
