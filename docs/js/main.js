
// $(function(){
//   SyntaxHighlighter.all();
// });
//$(window).load(function(){ //I commented this out since the top banner slide bg wouldn't load until after youtube video grid was fully loaded. document.ready() fires earlier, so I went with that
$(document).ready(function () {
  if ($('.flexslider').length > 0) {
    $('.flexslider').flexslider({
      animation: "fade",
      animationLoop: "true",
      customDirectionNav: $(".custom-navigation .arrow"),
      start: function (slider) {
        $('body').removeClass('loading');
      }
    });
  }
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

function scrollToAnchor(aid) {

  if ((window.innerWidth < 768)) {
    console.log('narrow viewport');
    var scrollOffset = 52;
  }
  if ((window.innerWidth > 768 && window.innerWidth < 992)) {
    console.log('medium viewport');
    var scrollOffset = 60;
  }
  else if ((window.innerWidth > 992)) {
    console.log('wide viewport');
    var scrollOffset = 75;
  }

  var aTag = $("a[name='" + aid + "']");
  $('html,body').animate({ scrollTop: aTag.offset().top - scrollOffset - 20 }, 'slow');
  console.log('offset is ' + scrollOffset);
}

$('.view-videos').on('click', function (e) {
  scrollToAnchor('videos');
});

//Submenu Toggles

$('.submenu-toggle').on('click', function (e) {
  var parent = $(e.currentTarget).parent();
  parent.toggleClass('open');
});

$('.nav-list-item.submenu').mouseover(function (e) {
  if ($(window).width() > 618) {
    $('.nav-list-item').removeClass('open');
    $(e.currentTarget).addClass('open');
  }
});

$('.nav-list-item.submenu').mouseout(function (e) {
  if ($(window).width() > 618) {
    //$('.nav-list-item').removeClass('open');
    $(e.currentTarget).removeClass('open');
  }
});

$('.nav-submenu').mouseout(function (e) {
  var parent = $(e.currentTarget).parent();
  if ($(window).width() > 618) {
    $(parent).removeClass('open');
  }
});

//Schedule Page jQuery
$(function () {
  $('#showall').click(function () {
    $('.targetDiv').fadeIn();
  });
  $('.showSingle').click(function () {
    $('.targetDiv').hide();
    $('#div' + $(this).attr('target')).fadeIn();
  });
});

$(document).ready(function () {
  $(window).resize(function () {
    var bodyheight = $(this).height();
    var navheight = $('.navbar').outerHeight(true);
    var homepagetopbar = $('.homepage--top-bar').outerHeight(true);
    $("#sidebar").height(bodyheight);
    var videoheight = bodyheight - navheight - homepagetopbar;
    $(".homepage--hero-video-container").css("margin-top", homepagetopbar);
    $(".homepage--hero-video-container").css("height", videoheight);

  }).resize();

  // Video pause/play toggle
  $('.video-pause-btn').on('click', function () {
    var video = $('.video-item')[0];
    var btn = $(this);
    if (video.paused) {
      video.play();
      btn.html('❚❚').attr('aria-label', 'Pause background video').attr('title', 'Pause video');
    } else {
      video.pause();
      btn.html('▶').attr('aria-label', 'Play background video').attr('title', 'Play video');
    }
  });
});

// Testimonials rotator
$(document).ready(function () {
  var slides = $('.quote-slide');
  var dots = $('.rotate-dots button');
  var current = 0;
  var interval;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.removeClass('active');
    dots.removeClass('active');
    $(slides[index]).addClass('active');
    $(dots[index]).addClass('active');
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startRotation() {
    interval = setInterval(nextSlide, 5000);
  }

  dots.on('click', function () {
    clearInterval(interval);
    showSlide(parseInt($(this).data('index')));
    startRotation();
  });

  startRotation();
});

// PostHog event tracking
$(document).ready(function () {
  if (typeof posthog === 'undefined') return;

  // Track Register button clicks (links to ti.to)
  $('a[href*="ti.to"]').on('click', function () {
    posthog.capture('register_click', {
      link_text: $(this).text().trim(),
      link_url: $(this).attr('href'),
      page: window.location.pathname
    });
  });

  // Track newsletter signup submissions
  $('#mc-embedded-subscribe-form').on('submit', function () {
    posthog.capture('newsletter_signup', {
      page: window.location.pathname
    });
  });

  // Pass UTM params through to Tito links so Tito captures source attribution
  var searchParams = new URLSearchParams(window.location.search);
  var utmParams = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (param) {
    if (searchParams.has(param)) {
      utmParams[param] = searchParams.get(param);
    }
  });
  if (Object.keys(utmParams).length > 0) {
    $('a[href*="ti.to"]').each(function () {
      var url = new URL($(this).attr('href'));
      Object.keys(utmParams).forEach(function (key) {
        url.searchParams.set(key, utmParams[key]);
      });
      $(this).attr('href', url.toString());
    });
  }
});

