
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
      console.log(parent);
    });