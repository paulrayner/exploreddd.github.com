
    // $(function(){
    //   SyntaxHighlighter.all();
    // });
    $(window).load(function(){
      $('.flexslider').flexslider({
        animation: "fade",
        animationLoop: "true",
        customDirectionNav: $(".custom-navigation .arrow"),
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
    });

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
