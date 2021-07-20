import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class Sahne {

  constructor(args) {

    this.textureLoader = new THREE.TextureLoader()
    this.normalTexture = this.textureLoader.load('public/img/textures/NormalMap.png')

    // Canvas
    this.canvas = document.querySelector('canvas.conf')

    // Scene
    this.scene = new THREE.Scene()

    // Objects
    // this.geometry = new THREE.SphereBufferGeometry(.5,64,64)
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );


    // Materials
    this.material = new THREE.MeshStandardMaterial()
    this.material.metalness = 0.7
    this.material.roughness = 0.2
    this.material.normalMap = this.normalTexture
    this.material.color = new THREE.Color(0x292929)

    // Mesh
    this.cubeA = new THREE.Mesh(this.geometry,this.material)
    this.cubeB = new THREE.Mesh(this.geometry,this.material)

    this.cubeA.position.set( 0, 0, 0 );
    this.cubeB.position.set( 1, 1, 0 );

    this.group = new THREE.Group();
    this.group.add( this.cubeA );
    this.group.add( this.cubeB );

    this.scene.add( this.group );


    // this.scene.add(this.cube)

    // Light 1
    this.pointLight1 = new THREE.PointLight(0xff0000, 1)
    this.pointLight1.position.set(-1.86,1,-1.65)
    this.pointLight1.intensity = 10
    this.scene.add(this.pointLight1)

    // Light 2
    this.pointLight2 = new THREE.PointLight(0xffb3, 1)
    this.pointLight2.position.set(2.66,-1.58,-1.6)
    this.pointLight2.intensity = 10
    this.scene.add(this.pointLight2)

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 2
    this.scene.add(this.camera)

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true
    })

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.clock = new THREE.Clock()

    this.mouseX = 0
    this.mouseY = 0
    this.targetX = 0
    this.targetY = 0

  }

  onDocumentMouseMove = (event) => {
    this.mouseX = (event.clientX - window.innerWidth / 2)
    this.mouseY = (event.clientY - window.innerHeight / 2)
  }

  resize = (event) => {
      // Update sizes
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  updateMaterial = (mat) => {
    let newTexture = this.textureLoader.load(mat)
    this.material.normalMap = newTexture;
    this.material.needsUpdate = true;
  }

  updateSize = (scl) => {
    this.cubeA.scale.x = scl
    this.cubeA.scale.y = scl
    this.cubeA.scale.z = scl
  }

  updateElement = () => {
    this.group.remove(this.cubeA);
    this.controls.update();
    this.camera.updateProjectionMatrix();
  }

  tick = () =>
  {
    this.targetX = this.mouseX * .001
    this.targetY = this.mouseY * .001

    const elapsedTime = this.clock.getElapsedTime()

    // Update objects
    this.group.rotation.y = .4 * elapsedTime
    this.group.rotation.y += .6 * (this.targetX - this.group.rotation.y)
    this.group.rotation.x += .6 * (this.targetY - this.group.rotation.x)
    this.group.position.z += .6 * (this.targetY - this.group.rotation.x)

    // Update Orbital Controls
    this.controls.update()

    // Render
    this.renderer.render(this.scene, this.camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(this.tick)
  }

}

export default Sahne;
