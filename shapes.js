module.exports = function() {

  var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({transparent: true, color: 0xffffff})
  )


  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshLambertMaterial({transparent: true, color: 0xffffff})
  )

  var cone = new THREE.Mesh(
    new THREE.ConeGeometry(5, 20, 32),
    new THREE.MeshLambertMaterial({transparent: true, color: 0xffffff})
  )

  return [box, sphere, cone]
}
