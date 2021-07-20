console.log("main.js");
import Sahne from '../../public/js/sahne.js';
import Yukleme from '../../public/js/load.js';

// window.sahne = new Sahne();
// window.sahne.tick()

window.sahne = new Yukleme();

async function main() {
  const gltfData = await window.sahne.create();
  if (gltfData) {
    run();
  }
}
main().catch(error => {
  console.error(error);
});

const run = () => {
  window.sahne.getChildren();
}

// window.sahne.animate();
