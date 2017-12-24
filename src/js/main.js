
// $(function(){
//   SyntaxHighlighter.all();
// });
//$(window).load(function(){ //I commented this out since the top banner slide bg wouldn't load until after youtube video grid was fully loaded. document.ready() fires earlier, so I went with that
$( document ).ready(function() {
  $('.flexslider').flexslider({
    animation: "fade",
    animationLoop: "true",
    customDirectionNav: $(".custom-navigation .arrow"),
    start: function(slider){
      $('body').removeClass('loading');
    }
  });
});

//homepage anchor scroll link to videos section

/*var onResizing = function(event) {
  if ((window.innerWidth < 768))  {
    console.log('narrow viewport');
    var scrollOffset = 52; 
  } 
  if ((window.innerWidth > 768 && window.innerWidth < 992))  {
    console.log('medium viewport');
    var scrollOffset = 60;
  } 
  else if ((window.innerWidth > 992))  {
    console.log('wide viewport');
    var scrollOffset = 75;
  }
}; 

window.onresize = onResizing;
window.onload = onResizing;*/

function scrollToAnchor(aid){

  if ((window.innerWidth < 768))  {
    console.log('narrow viewport');
    var scrollOffset = 52; 
  } 
  if ((window.innerWidth > 768 && window.innerWidth < 992))  {
    console.log('medium viewport');
    var scrollOffset = 60;
  } 
  else if ((window.innerWidth > 992))  {
    console.log('wide viewport');
    var scrollOffset = 75;
  }

  var aTag = $("a[name='"+ aid +"']");
  $('html,body').animate({scrollTop: aTag.offset().top - scrollOffset - 20},'slow');
  console.log('offset is ' + scrollOffset);
}

$('.view-videos').on('click', function(e){
  scrollToAnchor('videos');
});

//Submenu Toggles

$('.submenu-toggle').on('click', function(e){
  var parent = $(e.currentTarget).parent();
  parent.toggleClass('open');
});

$('.nav-list-item.submenu').mouseover(function(e){
  if ($(window).width() > 618) {
    $('.nav-list-item').removeClass('open');
    $(e.currentTarget).addClass('open');
  }
});

$('.nav-list-item.submenu').mouseout(function(e){
  if ($(window).width() > 618) {
    //$('.nav-list-item').removeClass('open');
    $(e.currentTarget).removeClass('open');
  }
});

$('.nav-submenu').mouseout(function(e){
  var parent = $(e.currentTarget).parent();
  if ($(window).width() > 618) {
    $(parent).removeClass('open');
  }
});

//Schedule Page jQuery
$(function(){
  $('#showall').click(function(){
    $('.targetDiv').fadeIn();
});
$('.showSingle').click(function(){
  $('.targetDiv').hide();
  $('#div'+$(this).attr('target')).fadeIn();
  });
});


