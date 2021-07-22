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
// $('.nav-tabs > li a[title]').tooltip();

var main_condition = true;
var step_controller;

function nextTab(active,$this) {
  // $(active).parent().next().find('a[data-toggle="tab"]').click();
  step_controller = getCurrentStep($this);
  step_controller ++;

  let nextEl = $('#ul-stepLinks').children().eq(step_controller).find('a[data-toggle="tab"]');
  // $(elem).parent().prev().find('a[data-toggle="tab"]').click();
  nextEl.click();

  console.log("next - step_controller",step_controller);
}

function prevTab($this) {
  step_controller -= 1;

  let prevEl = $('#ul-stepLinks').children().eq(step_controller).find('a[data-toggle="tab"]');
  // $(elem).parent().prev().find('a[data-toggle="tab"]').click();
  prevEl.click();

  console.log("prev - step_controller",step_controller);

  // console.log("elem",$(elem));
  // console.log("prev",$(elem).parent().prev().find('a[data-toggle="tab"]'));
  // console.log("eq",$(elem).parent().parent().children().eq(step_controller).find('a[data-toggle="tab"]'));
}
function lastTab($this) {
  step_controller += 1;
  console.log("last - step_controller",step_controller);
  $('#btn-complete').click();
}

const getCurrentStep = ($this) => {
  let step = parseInt($this.parent().parent().attr('data-step'));
  return step;
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

$.getJSON('step_managet_step_test.json',  function(json, textStatus) {})
.done(function(data){

  //Wizard
  $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    var $target = $(e.target);
    if ($target.parent().hasClass('disabled')) {
      return false;
    }
  });


  $(document).on('mouseover', '.next-step', function(e) {
    // let step = parseInt($(this).parent().parent().attr('data-step'));
    let step = getCurrentStep($(this));
    step++;

    let optid = parseInt($(this).attr('data-optid'));
    let name = $(this).attr('data-name');

    update_userinput(name,optid);

    if (step < Object.keys(user_input).length) {
      create_secenekler(step);
    }

  });


  $(document).on('click', '.next-step', function(e) {
    if (main_condition) {
      var $active = $('.nav-tabs li>.active');
      $active.parent().next().find('.nav-link').removeClass('disabled');
      nextTab($active, $(this));
    } else {
      $('#btn-complete').removeClass('disabled');
      lastTab($(this));
    }
  });

  $(document).on('click', '.prev-step', function(e) {
    prevTab($(this));
  });

  const update_userinput = (name,optid) => {
    user_input[name] = optid;
  }


  const create_secenekler = (step) => {

    let item = data.steps[step];
    let secenekler = "| ";
    let secenek_arr = [];
    let name = item.name;

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
        secenek_arr.push({optid:o.optid,text:o.text});
      }

    });

    if (!secenek_arr.length) {
      main_condition = false;
    } else {
      main_condition = true;
    }

    // do {
    //   if (main_condition) {
    //     result = parseInt(prompt(item.name + " seçiniz :____" +secenekler));
    //   }
    // } while (!secenek_arr.includes(result) && main_condition);
    //
    // user_input[item.name] = result;
    //
    // sahne.updateSahne(user_input);

    var buttons = "";
    secenek_arr.forEach((item, i) => {
      let btn_id = 'btn-step-'+step+'-'+i;

      buttons += '<button id="'+btn_id+'" data-optid="'+item.optid+'" data-name="'+name+'" type="button" class="btn btn-primary next-step float-right">'+item.text+'</button>'
    });


    $('#step'+(step)+'>.dv-seceneklerButtons').html(buttons);

  }



});





// $(document).on('click','#btn-steptest', function (arguments) {
//
//   $.getJSON('step_managet_step_test.json',  function(json, textStatus) {})
//   .done(function(d){
//     let i = 0;
//     var result = null;
//     var main_condition = true;
//     do {
//       let item = d.steps[i];
//       let secenekler = "| ";
//       let secenek_arr = [];
//
//       item.options.forEach((o, k) => {
//
//         let cond1 = o.rules.includes("*");
//         let cond2 = o.rules.some((el) => {
//
//           let temp_arr = [];
//           Object.keys(el).map(function(key, index) {
//             if (el[key] != "*") {
//               let _key = key;
//               let _obj = {};
//               _obj[_key] = el[key];
//               temp_arr.push(_obj);
//             }
//           });
//
//           let cond_ic =  temp_arr.every((e) => {
//             let temp;
//             for (const [key, value] of Object.entries(e)) {
//               temp = value.includes(user_input[key]);
//             }
//             return temp;
//           })
//           return cond_ic;
//
//
//         });
//
//         if (cond1 || cond2) {
//           secenekler += o.text + ": " + o.optid + " | ";
//           secenek_arr.push(o.optid);
//         }
//
//       });
//
//       if (!secenek_arr.length) main_condition = false;
//
//       do {
//         if (main_condition) {
//           result = parseInt(prompt(item.name + " seçiniz :____" +secenekler));
//         }
//       } while (!secenek_arr.includes(result) && main_condition);
//
//       user_input[item.name] = result;
//
//       i++;
//
//       // console.log(user_input);
//       // console.log(sahne);
//       sahne.updateSahne(user_input);
//     } while (i < d.steps.length && main_condition);
//
//
//   });
//
//
//
//
//
//
// })
