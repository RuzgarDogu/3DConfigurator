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
    // const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
    // https://threejs.org/docs/#api/en/geometries/SphereGeometry
    this.geometry = new THREE.SphereBufferGeometry(.5,64,64)


    // Materials

    // const material = new THREE.MeshBasicMaterial()
    this.material = new THREE.MeshStandardMaterial()
    this.material.metalness = 0.7
    this.material.roughness = 0.2
    this.material.normalMap = this.normalTexture
    this.material.color = new THREE.Color(0x292929)
    // Mesh
    this.sphere = new THREE.Mesh(this.geometry,this.material)
    this.scene.add(this.sphere)

    // Lights

    this.pointLight = new THREE.PointLight(0xffffff, 0.1)
    this.pointLight.position.x = 2
    this.pointLight.position.y = 3
    this.pointLight.position.z = 4
    this.scene.add(this.pointLight)

    // Light 2
    this.pointLight2 = new THREE.PointLight(0xff0000, 1)
    this.pointLight2.position.set(-1.86,1,-1.65)
    this.pointLight2.intensity = 10
    this.scene.add(this.pointLight2)

    this.pointLight3 = new THREE.PointLight(0xffb3, 1)
    this.pointLight3.position.set(2.66,-1.58,-1.6)
    this.pointLight3.intensity = 10
    this.scene.add(this.pointLight3)

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    /**
    * Camera
    */
    // Base camera
    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 2
    this.scene.add(this.camera)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
    * Renderer
    */
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

    document.addEventListener('mousemove',this.onDocumentMouseMove)
    window.addEventListener('resize',this.resize)

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

  tick = () =>
  {
    this.targetX = this.mouseX * .001
    this.targetY = this.mouseY * .001

    const elapsedTime = this.clock.getElapsedTime()

    // Update objects
    this.sphere.rotation.y = .4 * elapsedTime

    this.sphere.rotation.y += .6 * (this.targetX - this.sphere.rotation.y)
    this.sphere.rotation.x += .6 * (this.targetY - this.sphere.rotation.x)
    this.sphere.position.z += .6 * (this.targetY - this.sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    this.renderer.render(this.scene, this.camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(this.tick)
  }

}

export default Sahne;
