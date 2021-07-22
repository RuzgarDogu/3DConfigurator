import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as dat from 'dat.gui'

class Yukleme extends THREE.Group {
  constructor() {
    super();
    this.gui = new dat.GUI();
    this.gui.close();
    // this.modelUrl = 'public/3d/gltf/OfficeBuilding.glb';
    // this.modelUrl = 'public/3d/gltf/Test_Dwg_mini.gltf';
    // this.modelUrl = 'public/3d/gltf/fbx_to_gltf_by_aspose.gltf';
    // this.modelUrl = 'public/3d/gltf/fbx_to_gltf_byaspose.gltf';
    // this.modelUrl = 'public/3d/gltf/stl_threejseditor_to_gltf.gltf';
    // this.modelUrl = 'public/3d/gltf/Test_Dwg_stl_to_gltf.glb';
    // this.modelUrl = 'public/3d/gltf/scene.glb';
    this.modelUrl = 'public/3d/gltf/scene.gltf';
    this.canvas = document.querySelector('canvas.conf');
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.gltfElements = [];
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    this.dracoLoader.setDecoderPath( 'node_modules/three/examples/js/libs/draco/' );
    this.loader.setDRACOLoader( this.dracoLoader );

    this.textureLoader = new THREE.TextureLoader()

    // this.create();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: true
    });

    this.ambientLight = new THREE.AmbientLight( 0xcccccc );
    this.scene.add( this.ambientLight );

    this.pointLight1 = new THREE.PointLight(0xff0000, 1)
    this.pointLight1.position.set(-13,10,1)
    this.pointLight1.intensity = 100
    // this.scene.add(this.pointLight1)

    // Light 2
    this.pointLight2 = new THREE.PointLight(0xffb3, 1)
    this.pointLight2.position.set(9,6,-10)
    this.pointLight2.intensity = 100
    // this.scene.add(this.pointLight2)

    const light1 = this.gui.addFolder('Light1')
    const light2 = this.gui.addFolder('Light2')

    light1.add(this.pointLight1.position,'x').min(-30).max(30).step(.01)
    light1.add(this.pointLight1.position,'y').min(-30).max(30).step(.01)
    light1.add(this.pointLight1.position,'z').min(-30).max(30).step(.01)
    light1.add(this.pointLight1,'intensity').min(0).max(100).step(.01)

    light2.add(this.pointLight2.position,'x').min(-30).max(30).step(.01)
    light2.add(this.pointLight2.position,'y').min(-30).max(30).step(.01)
    light2.add(this.pointLight2.position,'z').min(-30).max(30).step(.01)
    light2.add(this.pointLight2,'intensity').min(0).max(100).step(.01)

    this.pointLightHelper = new THREE.PointLightHelper(this.pointLight1,1)
    // this.scene.add(this.pointLightHelper)

    this.pointLightHelper2 = new THREE.PointLightHelper(this.pointLight2,1)
    // this.scene.add(this.pointLightHelper2)

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // this.scene.background = new THREE.Color(0x332233);
    // this.scene.add(new THREE.HemisphereLight(0xffffcc, 0x333399, 1.0));

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(15, 15, 15);



    const helper = new THREE.CameraHelper( this.camera );
    this.scene.add( helper );


    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true

    this.gui.add( this.camera.position , 'x', -50, 50 ).step(1)
    this.gui.add( this.camera.position , 'y', -50, 50 ).step(1)
    this.gui.add( this.camera.position , 'z', -50, 50 ).step(1)
    // this.gui.add( this.controls , 'rotation', -50, 50 ).step(1)
  }

  centerControls = () => {
    var bb = new THREE.Box3()
    bb.setFromObject(this.group);
    bb.getCenter(this.controls.target);
    this.camera.updateProjectionMatrix();
    this.controls.update();
    console.log("bb",bb);
  }

  animate = () => {
    // this.scene.rotateX(Math.PI / 360);
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.animate);
    return true;
  }

  create = () => {

    return new Promise((resolve, reject) => {
        // loader.load(this.modelUrl, gltf => resolve(data), null, reject);
        var _scene = this.scene;
        var _group = this.group;

        this.loader.load(
          this.modelUrl,
          gltf => {
            // this.updateMaterials(gltf.scene);
            this.updateTransform();
            // this.scene.add(gltf.scene);

            // var model = gltf.scene;
            // var newMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
            // model.traverse((o) => {
            //   if (o.isMesh) o.material = newMaterial;
            // });

            for (var i = 0; i < gltf.scene.children.length; i++) {
              // console.log(gltf.scene.children[0]);
              this.gltfElements.push(gltf.scene.children[i])
            }

            // console.log(this.gltfElements);
            this.gltfElements.forEach((item, i) => {
              _group.add(item)
            });
            _scene.add(_group);
            // this.scene = _scene;
            resolve( this.animate());
            this.centerControls();
          }
        );
      });
  }

  // updateMaterials = (model) => {
  //   model.traverse(child => {
  //     child.material = new THREE.MeshNormalMaterial();
  //   });
  // }

  updateMaterial = (id,mat) => {
    console.log(this.scene);
    let newTexture = this.textureLoader.load(mat)
    var newMaterial = new THREE.MeshStandardMaterial({ map: newTexture });
    // var newMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
    this.gltfElements[id].traverse(child => {
      if (child.isMesh) {
        child.material = newMaterial;
        child.material.needsUpdate = true;
      }
    })
    // console.log(this.scene);
    this.centerControls()

  }

  cloneElement = () => {
    this.gltfElements.forEach((item, i) => {
      let clo = item.clone();
      let box = new THREE.Box3().setFromObject( clo );
      // console.log("box",box);
      clo.translateX( box.min.x );
      this.group.add(clo);
      this.centerControls()

    });

    // var clo = this.gltfElements[1].clone();
    // console.log(clo);
    // // this.scene.remove(this.gltfElements[1]);
    // var box = new THREE.Box3().setFromObject( clo );
    // console.log("box",box);
    // clo.translateX( box.min.x );
    // this.scene.add(clo);
  }

  updateTransform = () => {
    this.rotation.z += Math.PI / 2;
    this.scale.set(2.0, 2.0, 2.0);
    this.centerControls()

  }

  getChildren = () => {
    // let id = 3;
    // console.log(this.scene);
    this.scene.traverse(function(element) {
      // console.log("element",element);
      // if (element.children[0].children[0].treeNode.sid == id) {
      //     this.scene.remove(this.scene.getObjectById(element.id);
      //     // And since you know it's unique...
      //     return;
      // }
    })
    this.centerControls()

  }

  updateSahne = (d) => {
    if (d.cati_adedi == 11) {
      this.gltfElements.forEach((item, i) => {
        console.log("....");
        console.log(item);
        console.log("....");
      });
    } else if (d.cati_adedi = 12) {
      this.group.remove(this.gltfElements[3]);
      this.group.remove(this.gltfElements[4]);
      this.group.remove(this.gltfElements[5]);
      this.centerControls();
    }
  }

}

export default Yukleme;
