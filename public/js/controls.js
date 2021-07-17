console.log("controls.js");

const sahne = window.sahne;

$(document).on('click mouseover', '#btn-1-1', function(e) {
  sahne.updateMaterial('public/img/textures/normalmap2.png');
})

$(document).on('click mouseover', '#btn-1-2', function(e) {
  sahne.updateMaterial('public/img/textures/NormalMap.png');
})

$(document).on('click mouseover', '#btn-2-1', function(e) {
  sahne.updateSize(0.5);
})

$(document).on('click mouseover', '#btn-2-2', function(e) {
  sahne.updateSize(1);
})

$(document).on('click mouseover', '#btn-2-3', function(e) {
  sahne.updateSize(1.4);
})

document.addEventListener('mousemove',sahne.onDocumentMouseMove)
window.addEventListener('resize',sahne.resize)


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
