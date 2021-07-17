console.log("controls.js");
import Sahne from '../../public/js/sahne.js';

var sahne = new Sahne();
sahne.tick()

$(document).on('click', '#btn-1', function(e) {
  console.log(1);
  sahne.updateMaterial('public/img/textures/normalmap2.png');
})
