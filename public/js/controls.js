console.log("controls.js");

const sahne = window.sahne;
//
$(document).on('click mouseover', '#btn-1-1', function(e) {
  sahne.updateMaterial(0,'public/img/textures/concrete.jpg');
})
//
$(document).on('click mouseover', '#btn-1-2', function(e) {
  sahne.updateMaterial(0,'public/img/textures/pv_panel.png');
})
//
$(document).on('click mouseover', '#btn-2-1', function(e) {
  sahne.updateMaterial(2,'public/img/textures/galvanizli.jpg');
})

$(document).on('click mouseover', '#btn-2-2', function(e) {
  sahne.updateMaterial(2,'public/img/textures/boyali.jpg');
})
//
// $(document).on('click mouseover', '#btn-2-3', function(e) {
//   sahne.updateSize(1.4);
// })
//
$(document).on('click mouseover', '#btn-3-1', function(e) {
  sahne.cloneElement();
})
//
// document.addEventListener('mousemove',sahne.onDocumentMouseMove)
// window.addEventListener('resize',sahne.resize)
//
//
//Initialize tooltips
$('.nav-tabs > li a[title]').tooltip();

//Wizard
$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    var $target = $(e.target);
    if ($target.parent().hasClass('disabled')) {
        return false;
    }
});

$(".next-step").click(function (e) {
    var $active = $('.nav-tabs li>.active');
    $active.parent().next().find('.nav-link').removeClass('disabled');
    nextTab($active);
});

$(".prev-step").click(function (e) {
    var $active = $('.nav-tabs li>a.active');
    prevTab($active);
});

function nextTab(elem) {
    $(elem).parent().next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).parent().prev().find('a[data-toggle="tab"]').click();
}


var user_input = {
  baslangic:null,
  cati_adedi : null,
  genislik : null,
  yukseklik : null,
  aciklik : null,
  aks_adedi : null,
  ayaklar : null,
  cati_kaplama : null,
  kenar_duvarlar : null,
  koruk : null,
  kapi : null
}



$(document).on('click','#btn-steptest', function (arguments) {

  $.getJSON('step_managet_step_test.json',  function(json, textStatus) {})
  .done(function(d){
    let i = 0;
    var result = null;
    var main_condition = true;
    do {
      let item = d.steps[i];
      let secenekler = "| ";
      let secenek_arr = [];

      item.options.forEach((o, k) => {

        let cond1 = o.rules.includes("*");
        let cond2 = o.rules.some((el) => {

          let temp_arr = [];
          Object.keys(el).map(function(key, index) {
            if (el[key] != "*") {
              let _key = key;
              let _obj = {};
              _obj[_key] = el[key];
              temp_arr.push(_obj);
            }
          });

          let cond_ic =  temp_arr.every((e) => {
            let temp;
            for (const [key, value] of Object.entries(e)) {
              temp = value.includes(user_input[key]);
            }
            return temp;
          })
          return cond_ic;


        });

        if (cond1 || cond2) {
          secenekler += o.text + ": " + o.optid + " | ";
          secenek_arr.push(o.optid);
        }
        console.log("...");
        console.log("cond1",cond1);
        console.log("cond2",cond2);
        console.log(secenek_arr);
        console.log("...");

      });

      if (!secenek_arr.length) main_condition = false;

      do {
        if (main_condition) {
          result = parseInt(prompt(item.name + " seçiniz :____" +secenekler));
        }
      } while (!secenek_arr.includes(result) && main_condition);

      user_input[item.name] = result;

      i++;


    } while (i < d.steps.length && main_condition);


  });






})
