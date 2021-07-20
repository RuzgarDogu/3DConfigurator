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
